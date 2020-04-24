import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';
import { ColumnDisplayInterface } from '../../../../../../../../shared/modules/table-display/models/column-display.interface';
import { ProgramInterface } from '../../../../../../models/program.interface';
import { TimeDisplayPipe } from '../../../../../../../../shared/pipes/time-display/time-display.pipe';

@Component({
  selector: 'ch-programs-table',
  templateUrl: './programs-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramsTableComponent {

  columns: ColumnDisplayInterface[] = [
    {
      columnName: ProgramsService.TITLE,
      displayName: 'Name',
      displayFunc: (item: ProgramInterface) => item.program_title ? item.program_title : 'Untitled',
      linkable: true,
      sortable: true,
      activeSort: true,
      activeSortDirection: 'asc'
    },
    {
      columnName: ProgramsService.PROGRAM_START,
      displayName: 'Start',
      displayFunc: (item: ProgramInterface) => this._timeDisplayPipe.transform(item.program_start),
      sortable: true
    },
    {
      columnName: ProgramsService.REGISTRATIONS_COUNT,
      displayName: 'Registrations',
      displayFunc: (item: ProgramInterface) => item.registrations_count.toString()
    }
  ];

  private _timeDisplayPipe = new TimeDisplayPipe();

  constructor(public service: ProgramsService) {
  }
}
