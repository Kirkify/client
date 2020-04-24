import { Injectable, OnDestroy } from '@angular/core';
import { FormCreatorStore } from '../state/form-creator.store';
import { QuestionTypeEnum } from '../models/question-type.enum';
import { guid, transaction } from '@datorama/akita';
import { SectionInterface } from '../models/section.interface';
import { FormCreatorQuery } from '../state/form-creator.query';
import { QuestionMetaInterface } from '../models/question-meta.interface';
import { FormInterface } from '../models/form.interface';
import { FormHttpService } from './form-http.service';

@Injectable()
export class FormCreatorService implements OnDestroy {

  private _id: string;

  constructor(
    private service: FormHttpService,
    private query: FormCreatorQuery,
    private store: FormCreatorStore
  ) {}

  ngOnDestroy(): void {
    this.updateForm();
  }

  @transaction()
  instantiateForm(form: FormInterface) {
    this._id = form.id;

    if (form.value) {
      const value = JSON.parse(form.value);

      this.store.set(value.questions);
      this.store.update({
        sections: value.sections
      });
      const firstQuestion = this.query.getFirstQuestion();
      if (firstQuestion) {
        this.store.setActive(firstQuestion.id);
      }
    } else {
      this.createNewSection();
    }
  }

  @transaction()
  createNewSection() {
    const questionId = guid();
    const sectionId = guid();

    this.store.add({
      id: questionId,
      sortId: -1,
      sectionId,
      sectionHeader: true,
      type: QuestionTypeEnum.TitleAndDescription,
      meta: null,
      question: 'Untitled form',
      description: '',
      hideDescription: false,
      required: false,
    });

    const section: SectionInterface = {
      id: sectionId,
      sortId: this.query.getNextSectionSortId(),
    };

    this.store.update(state => ({
      ...state,
      sections: [ ...state.sections, section ]
    }));

    this.store.setActive(questionId);

    // this._updateForm();
  }

  addNewQuestion(type = QuestionTypeEnum.ShortAnswer) {
    const activeQuestion = this.query.getActive();

    if (activeQuestion) {
      const sectionId = activeQuestion.sectionId;
      const id = guid();
      this.store.add({
        id,
        sortId: this.query.getNextQuestionSortId(sectionId),
        sectionId,
        type,
        meta: null,
        question: '',
        description: '',
        hideDescription: true,
        sectionHeader: false,
        required: false
      });
      this.store.setActive(id);

      // No need to update the form here as every new question will trigger
      // A question meta data update, which will actually update the form
    }
  }

  updateQuestion(id: string, question: string) {
    this.store.update(id, { question });
    // this._updateForm();
  }

  @transaction()
  updateType(id: string, type: QuestionTypeEnum) {
    this.store.update(id, { type });

    this.store.update(id, {
      hideDescription: type !== QuestionTypeEnum.TitleAndDescription
    });

    // this._updateForm();
  }

  updateRequired(id: string, required: boolean) {
    this.store.update(id, { required });

    // this._updateForm();
  }

  updateMeta(id: string, meta: QuestionMetaInterface) {
    this.store.update(id, { meta });

    // this._updateForm();
  }

  updateActive(id: string) {
    this.store.setActive(id);
  }

  @transaction()
  moveQuestionWithinSection(sectionId: string, previousIndex: number, toIndex: number) {
    const questions = this.query.getQuestionsForSection(sectionId);

    const from = clamp(previousIndex, questions.length - 1);
    const to = clamp(toIndex, questions.length - 1);

    if (from === to) {
      return;
    }

    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      const questionId = questions[i + delta].id;
      this.store.update(questionId, {
        sortId: i
      });
    }

    this.store.update(questions[from].id, {
      sortId: questions[to].sortId
    });

    // this._updateForm();
  }

  reorderSections(sections: SectionInterface[]) {
    if (sections) {
      let counter = 0;
      for (const section of sections) {
        section.sortId = counter;
        counter++;
      }
      this.store.update({ sections });
      // this._updateForm();
    }
  }

  moveSection(fromIndex: number, toIndex: number) {
    const sections = JSON.parse(JSON.stringify(this.query.getValue().sections));

    const from = clamp(fromIndex, sections.length - 1);
    const to = clamp(toIndex, sections.length - 1);

    if (from === to) {
      return;
    }

    const target = sections[from].sortId;
    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      sections[i].sortId = sections[i + delta].sortId;
    }

    sections[to].sortId = target;

    this.store.update({ sections });
  }

  toggleDescription(id: string) {
    this.store.update(id, entity => ({
      ...entity,
      hideDescription: !entity.hideDescription,
    }));
    // this._updateForm();
  }

  @transaction()
  removeQuestion(id: string) {
    const question = this.query.getEntity(id);

    if (question) {
      this.store.setActive({ prev: true });
      const questions = this.query.getQuestionsForSection(question.sectionId);

      // If it's the last item in the array the sort order will not change
      if (question.sortId !== questions.length - 1) {
        for (const q of questions) {
          // No need to update the one which will be deleted
          if (q.id !== question.id) {
            this.store.update(q.id, entity => ({
              ...entity,
              sortId: entity.sortId - 1
            }));
          }
        }
      }
      this.store.remove(id);
      // this._updateForm();
    }
  }

  duplicateQuestion(id: string) {
    const question = this.query.getEntity(id);

    if (question) {
      const _id = guid();
      this.store.add({
        ...question,
        id: _id,
        sortId: this.query.getNextQuestionSortId(question.sectionId),
        sectionId: question.sectionId,
      });
      // this._updateForm();
      setTimeout(() => this.store.setActive(_id), 100);
    }
  }

  validateQuestions() {
    return true;
  }

  updateForm() {
    const questions = this.query.getAll();
    const sections = this.query.getValue().sections;

    this.service.updateForm(this._id, {
      value: JSON.stringify({
        questions,
        sections
      })
    });
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Moves an item one index in an array to another.
 * @param array Array in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which the item should be moved.
 */
export function moveItemInArray<T = any>(array: T[], fromIndex: number, toIndex: number): void {
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return;
  }

  const target = array[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }

  array[to] = target;
}


/**
 * Moves an item from one array to another.
 * @param currentArray Array from which to transfer the item.
 * @param targetArray Array into which to put the item.
 * @param currentIndex Index of the item in its current array.
 * @param targetIndex Index at which to insert the item.
 */
export function transferArrayItem<T = any>(currentArray: T[],
                                           targetArray: T[],
                                           currentIndex: number,
                                           targetIndex: number): void {
  const from = clamp(currentIndex, currentArray.length - 1);
  const to = clamp(targetIndex, targetArray.length);

  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
  }
}

/**
 * Copies an item from one array to another, leaving it in its
 * original position in current array.
 * @param currentArray Array from which to copy the item.
 * @param targetArray Array into which is copy the item.
 * @param currentIndex Index of the item in its current array.
 * @param targetIndex Index at which to insert the item.
 *
 */
export function copyArrayItem<T = any>(currentArray: T[],
                                       targetArray: T[],
                                       currentIndex: number,
                                       targetIndex: number): void {
  const to = clamp(targetIndex, targetArray.length);

  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray[currentIndex]);
  }
}

/** Clamps a number between zero and a maximum. */
function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}
