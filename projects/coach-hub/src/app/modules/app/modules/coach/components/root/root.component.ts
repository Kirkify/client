import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavListItemInterface } from '../../../../../../shared/modules/drawer-container/models/nav-list-item.interface';
import { CoachRoutesEnum } from '../../coach-routes.enum';

@Component({
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

  navList: NavListItemInterface[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      description: '',
      route: CoachRoutesEnum.Dashboard
    },
    {
      name: 'Profile',
      icon: 'account_circle',
      description: '',
      route: CoachRoutesEnum.Profile
    },
    {
      name: 'Programs',
      icon: 'assignment',
      description: '',
      route: CoachRoutesEnum.Programs
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

  constructor() {
  }

  ngOnInit() {
  }

}
