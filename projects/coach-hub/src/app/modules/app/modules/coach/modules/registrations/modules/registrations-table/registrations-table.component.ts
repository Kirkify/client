import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegistrationsService } from '../../services/registrations.service';
import { registrationDisplayName } from '../../helpers/registration-display-name';
import { ColumnDisplayInterface } from '../../../../../../../../shared/modules/table-display/models/column-display.interface';
import { RegistrationsQuery } from '../../state/registrations.query';
import { RegistrationProgramInterface } from '../../models/registration-program.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachRoutesEnum } from '../../../../coach-routes.enum';

@Component({
  selector: 'ch-registrations-table',
  templateUrl: './registrations-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationsTableComponent {

  displayName = registrationDisplayName;

  columns: ColumnDisplayInterface[] = [
    {
      columnName: RegistrationsService.NAME,
      displayName: 'Name',
      displayFunc: this.displayName,
      linkable: true,
      sortable: true,
      activeSort: true,
      activeSortDirection: 'asc'
    },
    {
      columnName: RegistrationsService.PROGRAM,
      displayName: 'Program',
      displayFunc: (item: RegistrationProgramInterface) => item.program.program_title,
      sortable: true,
      linkable: true,
      linkableRoute: this._getRegistrationRoute.bind(this)
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: RegistrationsService,
  ) {
  }

  private _getRegistrationRoute(item: RegistrationProgramInterface) {
    return this.router.serializeUrl(
      this.router.createUrlTree([ `../../../${ CoachRoutesEnum.Programs }`, item.program.id ], { relativeTo: this.route }));
  }
}
