import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoachHubQuery } from '../../../../state/coach-hub/coach-hub.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'ch-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  name$: Observable<string>;

  constructor(private query: CoachHubQuery) {
    this.name$ = this.query.selectCoachName();
  }

  ngOnInit() {
  }

}
