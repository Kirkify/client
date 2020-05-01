import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../../../state/ui/ui.service';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';

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
    private rootRoutingQuery: RootRoutingQuery,
    private uiService: UiService) {
  }

  updated() {
    this.uiService.showSnackbar('Your coach profile has been successfully created');
    this.router.navigate([ this.rootRoutingQuery.getCoachRoute ]);
  }
}
