import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { QuestionTypeBaseClass } from '../../models/question-type-base.class';
import { FormCreatorService } from '../../../../services/form-creator.service';
import { MultipleChoiceOptionInterface } from '../../../../models/multiple-choice-option.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { guid } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { FormCreatorQuery } from '../../../../state/form-creator.query';
import { QuestionTypeEnum } from '../../../../models/question-type.enum';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ch-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChoiceComponent extends QuestionTypeBaseClass implements OnInit, OnDestroy {

  options: MultipleChoiceOptionInterface[] = [];
  type$: Observable<QuestionTypeEnum>;
  isActive$: Observable<boolean>;
  questionTypeEnum = QuestionTypeEnum;
  formGroup: FormGroup;

  private _subscriptions = new Subscription();

  constructor(
    private service: FormCreatorService,
    private query: FormCreatorQuery,
    private fb: FormBuilder
  ) {
    super();

    this.formGroup = this.fb.group({});

    this._subscriptions.add(
      this.formGroup.valueChanges.pipe(
        tap(options => {
          const newOptions: MultipleChoiceOptionInterface[] = [];
          for (const [key, value] of Object.entries(options)) {
            // Do not allow any values to be empty strings
            if ((value as string).trim() === '') {
              const control = this.formGroup.get(key);

              const index = this.options.findIndex(x => x.id === key);

              if (index !== -1) {
                control.setValue(`Option ${index + 1}`);
                return;
              }
            } else {
              newOptions.push({
                id: key,
                value: value as string
              });
            }
          }
          this.options = newOptions;
          this.sendMeta();
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.isActive$ = this.query.selectIsQuestionActive(this.questionId);
    this.type$ = this.query.selectQuestionType(this.questionId);

    const meta = this.query.getMetaForQuestionId(this.questionId);

    if (meta) {
      if (meta.mc) {
        for (const option of meta.mc) {
          this.addControl(option);
        }
        this.options = meta.mc;
      }
    } else {
      this.createDefaultMeta();
    }
  }

  createDefaultMeta() {
    const firstOption: MultipleChoiceOptionInterface = {
      id: guid(),
      value: 'Option 1'
    };
    this.addControl(firstOption);
    this.options = [ firstOption ];
  }

  removeOption(option: MultipleChoiceOptionInterface) {
    const index = this.options.findIndex(x => x.id === option.id);

    if (index !== -1) {
      this.options = this.options.slice(0, index).concat(this.options.slice(index + 1));
      this.formGroup.removeControl(option.id);
    }
  }

  addControl(option: MultipleChoiceOptionInterface) {
    this.formGroup.addControl(option.id, new FormControl(option.value, {
      updateOn: 'blur'
    }));
  }

  addOption() {
    const option: MultipleChoiceOptionInterface = {
      id: guid(),
      value: `Option ${this.options.length + 1}`
    };
    // This call will trigger a valueChanges event on the formGroup
    this.addControl(option);
  }

  sendMeta() {
    this.service.updateMeta(this.questionId, {
      mc: this.options
    });
  }

  // onBlur(id: string) {
  //   const control = this.formGroup.get(id);
  //   const value: string = control.value;
  //
  //   if (value.trim() === '') {
  //     const index = this.options.findIndex(x => x.id === id);
  //
  //     if (index !== -1) {
  //       control.setValue(`Option ${index + 1}`);
  //     }
  //   }
  // }
}
