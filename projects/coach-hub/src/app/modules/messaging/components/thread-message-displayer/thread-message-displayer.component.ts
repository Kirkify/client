import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MessageInterface } from '../../models/message.interface';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

@Component({
  selector: 'ch-thread-message-displayer',
  templateUrl: './thread-message-displayer.component.html',
  styleUrls: ['./thread-message-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadMessageDisplayerComponent implements OnInit {
  @Input() user: Partial<UserInterface>;
  @Input() message: MessageInterface;

  constructor() { }

  ngOnInit() {
  }

}
