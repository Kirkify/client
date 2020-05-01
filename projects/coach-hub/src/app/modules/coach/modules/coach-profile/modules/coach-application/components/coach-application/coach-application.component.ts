import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ch-coach-application',
  templateUrl: './coach-application.component.html',
  styleUrls: [ './coach-application.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachApplicationComponent {
}
