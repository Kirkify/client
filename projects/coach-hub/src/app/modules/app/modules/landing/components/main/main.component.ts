import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CoachHubRoutesEnum } from '../../../../coach-hub-routes.enum';
import { Subscription } from 'rxjs';
import { LandingService } from '../../landing.service';
import { CoachQuery } from '../../../../../../state/coach/coach.query';

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  routes = CoachHubRoutesEnum;
  isCoach = this.query.selectIsCoach$;

  private _subscriptions = new Subscription();

  constructor(
    private query: CoachQuery,
    private service: LandingService
  ) {
  }

  ngOnInit() {
    this._subscriptions.add(
      this.service.fetchDashboard().subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
