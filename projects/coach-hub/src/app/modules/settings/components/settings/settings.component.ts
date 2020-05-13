import { Component } from '@angular/core';
import { SettingsRoutesEnum } from '../../settings-routes.enum';

interface Item {
  icon: string;
  name: string;
  description: string;
  route: string;
}

@Component({
  selector: 'ch-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ]
})
export class SettingsComponent {
  itemList: Item[] = [
    {
      icon: 'settings',
      name: 'General',
      description: 'Update your name, profile or email.',
      route: SettingsRoutesEnum.General
    },
    {
      icon: 'lock_outline',
      name: 'Security and Login',
      description: 'Update your password and other security items.',
      route: SettingsRoutesEnum.Security
    },
  ];

}
