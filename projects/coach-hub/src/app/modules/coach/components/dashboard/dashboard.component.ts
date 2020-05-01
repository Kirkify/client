import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoachQuery } from '../../../../state/coach/coach.query';

@Component({
  selector: 'ch-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  name$ = this.query.selectCoachName$;

  constructor(private query: CoachQuery) {
  }
}
