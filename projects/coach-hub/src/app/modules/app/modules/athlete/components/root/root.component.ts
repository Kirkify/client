import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavListItemInterface } from '../../../../../../shared/modules/drawer-container/models/nav-list-item.interface';
import { CoachRoutesEnum } from '../../../coach/coach-routes.enum';
import { AthleteRoutesEnum } from '../../athlete-routes.enum';

@Component({
  selector: 'ch-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

  navList: NavListItemInterface[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: AthleteRoutesEnum.Dashboard
    },
    {
      name: 'Favorites',
      icon: 'favorite',
      description: '',
      route: CoachRoutesEnum.Profile
    },
    {
      name: 'Search',
      icon: 'search',
      description: '',
      route: AthleteRoutesEnum.Search
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
