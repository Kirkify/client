import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NavListItemInterface } from '../../../../shared/modules/drawer-container/models/nav-list-item.interface';
import { CoachRoutesEnum } from '../../coach-routes.enum';
import { CoachQuery } from '../../../../state/coach/coach.query';
import { CoachService } from '../../../../state/coach/coach.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnDestroy {

  navList: NavListItemInterface[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      description: '',
      route: CoachRoutesEnum.Dashboard
    },
    {
      name: 'Programs',
      icon: 'assignment',
      description: '',
      route: CoachRoutesEnum.Programs
    },
    {
      name: 'Videos',
      icon: 'videocam',
      description: '',
      route: CoachRoutesEnum.Videos
    },
    {
      name: 'Profile',
      icon: 'account_circle',
      description: '',
      route: CoachRoutesEnum.Profile
    },
    {
      name: 'Registrations',
      icon: 'how_to_reg',
      description: '',
      route: CoachRoutesEnum.Registrations
    },
    {
      name: 'Locations',
      icon: 'place',
      description: '',
      route: CoachRoutesEnum.Locations
    },
    {
      name: 'Tags',
      icon: 'style',
      description: '',
      route: CoachRoutesEnum.Tags
    }
  ];

  private _subscriptions = new Subscription();

  constructor(
    private coachQuery: CoachQuery,
    private coachService: CoachService
  ) {
    if (! this.coachQuery.getValue().fetched) {
      this.coachService.getInitialState().subscribe();
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
