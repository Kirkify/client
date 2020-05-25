import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoachQuery } from '../../../../../../state/coach/coach.query';

@Component({
  selector: 'ch-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: [ './coach-profile.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachProfileComponent {
}
