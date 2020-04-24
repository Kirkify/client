import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { FormCreatorState, FormCreatorStore } from './form-creator.store';
import { map } from 'rxjs/operators';

@QueryConfig({
  sortBy: 'sortId',
  sortByOrder: Order.ASC
})
@Injectable()
export class FormCreatorQuery extends QueryEntity<FormCreatorState> {
  constructor(protected store: FormCreatorStore) {
    super(store);
  }

  getMetaForQuestionId(questionId: string) {
    const entity = this.getEntity(questionId);

    if (entity) {
      return entity.meta;
    }
  }

  getFirstQuestion() {
    const firstSection = this.getValue().sections.find(x => x.sortId === 0);

    if (firstSection) {
      const questions = this.getAll({
        limitTo: 2,
        filterBy: entity => entity.sectionId === firstSection.id
      });

      if (questions) {
        return questions.length === 2 ? questions[ 1 ] : questions[ 0 ];
      }
    }
  }

  getNextSectionSortId() {
    return this.getValue().sections.length;
  }

  getNextQuestionSortId(sectionId: string) {
    return this.getQuestionsForSection(sectionId).length;
  }

  selectIsQuestionActive(questionId: string) {
    return this.selectActiveId().pipe(
      map(id => id === questionId)
    );
  }

  selectQuestionType(questionId: string) {
    return this.selectEntity(questionId).pipe(
      map(entity => entity.type)
    );
  }

  selectSections() {
    return this.select(store => store.sections).pipe(
      map(sections => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections.sort((a, b) => {
          return a.sortId - b.sortId;
        });
        return newSections;
      })
    );
  }

  selectSectionsLength() {
    return this.select(store => store.sections).pipe(
      map(sections => sections.length)
    );
  }

  selectQuestionsForSection(sectionId: string) {
    return this.selectAll({
      filterBy: [
        entity => entity.sectionId === sectionId,
        entity => entity.sectionHeader === false
      ]
    });
  }

  selectSectionHeader(sectionId: string) {
    return this.selectEntity(entity => entity.sectionId === sectionId && entity.sectionHeader === true);
  }

  getQuestionsForSection(sectionId: string) {
    return this.getAll({
      filterBy: [
        entity => entity.sectionId === sectionId,
        entity => entity.sectionHeader === false
      ]
    });
  }
}
