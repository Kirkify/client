import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionInterface } from '../../../../models/question.interface';

@Component({
  selector: 'ch-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: [ './more-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreOptionsComponent implements OnInit {
  @Input() question: QuestionInterface;
  @Output() toggleDescription = new EventEmitter<string>();

  ngOnInit() {
    console.log(this.question);
    // this.service.updateMeta(this.questionId, null);
  }
}
