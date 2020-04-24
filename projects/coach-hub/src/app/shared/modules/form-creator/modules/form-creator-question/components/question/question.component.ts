import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { QuestionTypeEnum } from '../../../../models/question-type.enum';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { debounce, tap } from 'rxjs/operators';
import { FormCreatorQuery } from '../../../../state/form-creator.query';
import { FormCreatorService } from '../../../../services/form-creator.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionInterface } from '../../../../models/question.interface';
import { filterNil } from '@datorama/akita';
import { QuestionTypeBaseClass } from '../../models/question-type-base.class';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

interface QuestionViewInterface {
  id: QuestionTypeEnum;
  icon: string;
  name: string;
  template: () => TemplateRef<any>;
}

@Component({
  selector: 'ch-question',
  templateUrl: './question.component.html',
  styleUrls: [ './question.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() questionId: string;
  @Input() hideDrag: boolean;

  @ViewChild('question')
  question: ElementRef<HTMLInputElement>;

  @ViewChild('shortAnswer')
  shortAnswer: TemplateRef<QuestionTypeBaseClass>;

  @ViewChild('paragraph')
  paragraph: TemplateRef<QuestionTypeBaseClass>;

  @ViewChild('titleAndDescription')
  titleAndDescription: TemplateRef<QuestionTypeBaseClass>;

  @ViewChild('multipleChoice')
  multipleChoice: TemplateRef<QuestionTypeBaseClass>;

  formGroup: FormGroup;
  selectedQuestionTypeSubject = new BehaviorSubject<QuestionViewInterface>(null);
  selectedQuestionType$ = this.selectedQuestionTypeSubject.asObservable().pipe(
    filterNil,
  );

  question$: Observable<QuestionInterface>;
  isActive$: Observable<boolean>;

  questionTypes: QuestionViewInterface[] = [
    {
      id: QuestionTypeEnum.ShortAnswer,
      icon: 'short_text',
      name: 'Short Answer',
      template: () => this.shortAnswer
    },
    {
      id: QuestionTypeEnum.Paragraph,
      icon: 'notes',
      name: 'Paragraph',
      template: () => this.paragraph
    },
    {
      id: QuestionTypeEnum.TitleAndDescription,
      icon: 'text_fields',
      name: 'Title and Description',
      template: () => null
    },
    {
      id: QuestionTypeEnum.MultipleChoice,
      icon: 'radio_button_checked',
      name: 'Multiple Choice',
      template: () => this.multipleChoice
    },
    {
      id: QuestionTypeEnum.Checkboxes,
      icon: 'check_box',
      name: 'Checkboxes',
      template: () => this.multipleChoice
    },
    {
      id: QuestionTypeEnum.Dropdown,
      icon: 'arrow_drop_down_circle',
      name: 'Dropdown',
      template: () => this.multipleChoice
    },
  ];

  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private service: FormCreatorService,
    private query: FormCreatorQuery
  ) {
  }

  ngOnInit() {
    const question = this.query.getEntity(this.questionId);

    this.formGroup = this.fb.group({
      question: question.question,
      description: question.description
    });

    this._subscriptions.add(
      this.formGroup.get('question').valueChanges.pipe(
        debounce(() => timer(300)),
        tap(value => this.service.updateQuestion(this.questionId, value))
      ).subscribe()
    );

    this.question$ = this.query.selectEntity(this.questionId);

    this.isActive$ = this.query.selectIsQuestionActive(this.questionId);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
      this.query.selectEntity(this.questionId).pipe(
        filterNil,
        tap(entity => {
          this.selectedQuestionTypeSubject.next(this.questionTypes.find(x => x.id === entity.type));
        })
      ).subscribe()
    );
  }

  remove() {
    this.service.removeQuestion(this.questionId);
  }

  duplicate() {
    this.service.duplicateQuestion(this.questionId);
  }

  openOptions() {
    console.log('Open options');
  }

  toggleDescription(questionId: string) {
    this.formGroup.get('description').setValue('');
    this.service.toggleDescription(questionId);
  }

  onSelectionChanged(ev: MatSelectChange) {
    const value = ev.value as QuestionViewInterface;
    this.service.updateType(this.questionId, value.id);
  }

  onRequiredChanged(ev: MatSlideToggleChange) {
    this.service.updateRequired(this.questionId, ev.checked);
  }
}
