import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoachHubQuery } from '../../../../state/coach-hub/coach-hub.query';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../../../../../state/ui/ui.service';

@Component({
  selector: 'ch-become-a-coach',
  templateUrl: './become-a-coach.component.html',
  styleUrls: [ './become-a-coach.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BecomeACoachComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private query: CoachHubQuery,
    private uiService: UiService) {
  }

  updated() {
    this.uiService.showSnackbar('Your coach profile has been successfully created');
    this.router.navigate([ this.query.getCoachRoute() ]);
  }
}
