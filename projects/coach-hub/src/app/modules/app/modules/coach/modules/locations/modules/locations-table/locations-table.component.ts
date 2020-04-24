import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColumnDisplayInterface } from '../../../../../../../../shared/modules/table-display/models/column-display.interface';
import { LocationsService } from '../../services/locations.service';
import { locationDisplayName } from '../../helpers/location-display-name';

@Component({
  selector: 'ch-locations-table',
  templateUrl: './locations-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsTableComponent {

  displayName = locationDisplayName;

  columns: ColumnDisplayInterface[] = [
    {
      columnName: 'name',
      displayName: 'Name',
      displayFunc: this.displayName,
      linkable: true
    }
  ];

  constructor(
    public service: LocationsService
  ) {
  }
}
