import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormCreatorService } from '../../../../services/form-creator.service';
import { QuestionTypeBaseClass } from '../../models/question-type-base.class';

@Component({
  selector: 'ch-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: [ './short-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortAnswerComponent extends QuestionTypeBaseClass implements OnInit {

  constructor(private service: FormCreatorService) {
    super();
  }

  ngOnInit() {
    this.service.updateMeta(this.questionId, null);
  }
}
