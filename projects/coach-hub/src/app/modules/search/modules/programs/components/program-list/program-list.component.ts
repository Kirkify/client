import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterParamInterface } from '../../../../models/filter-param.interface';
import { ProgramsQuery } from '../../../../../app/state/programs/programs.query';
import { Observable, throwError } from 'rxjs';
import { ProgramInterface } from '../../../../../app/models/program.interface';
import { SearchService } from '../../../../services/search.service';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'ch-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: [ './program-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramListComponent implements OnInit {
  programs$: Observable<ProgramInterface[]>;
  loader = new VerySimpleLoaderClass();

  @Input() filterParam: FilterParamInterface;

  constructor(
    private programsQuery: ProgramsQuery,
    private searchService: SearchService
  ) {
    this.programs$ = this.programsQuery.selectAll();
  }

  ngOnInit() {
    this.loader.setLoadingStatus(true);
    this.searchService.selectAllPrograms().pipe(
      takeUntil(this.loader.getCancellableSubject()),
      catchError(err => {
        return throwError(err);
      }),
      finalize(() => this.loader.setLoadingStatus(false))
    ).subscribe();
  }

}
