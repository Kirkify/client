import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralRoutesEnum } from '../../general-routes.enum';

@Component({
  selector: 'ch-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: [ './general-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralListComponent {
  routes = GeneralRoutesEnum;
}
