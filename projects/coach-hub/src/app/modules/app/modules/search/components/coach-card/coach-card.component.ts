import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CoachProfileInterface } from '../../../../models/coach-profile.interface';

@Component({
  selector: 'ch-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachCardComponent implements OnInit {
  @Input() item: CoachProfileInterface;

  constructor() { }

  ngOnInit() {
  }

}
