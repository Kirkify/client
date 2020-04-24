import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ProgramInterface } from '../../../../../../models/program.interface';
import { ProgramsQuery } from '../../state/programs.query';
import { ProgramsService } from '../../services/programs.service';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsEnum } from '../../../shared/models/query-params.enum';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'ch-program-autocomplete',
  templateUrl: './program-autocomplete.component.html',
  styleUrls: [ './program-autocomplete.component.scss'],
  // Set this to default as we want the form control to react to the parent submit
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProgramAutocompleteComponent implements OnInit {
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;
  @Input() control: AbstractControl;

  isLoading$: Observable<boolean>;
  filteredPrograms$: Observable<ProgramInterface[]>;
  programs$: Observable<ProgramInterface[]>;

  private _subscriptions = new Subscription();

  constructor(
    private query: ProgramsQuery,
    private route: ActivatedRoute,
    private service: ProgramsService
  ) {
    this.isLoading$ = this.query.selectLoading();
    this.programs$ = this.query.selectAll();
  }

  ngOnInit(): void {
    if (!this.control) {
      console.error('You must input a form control to use this component');
      return;
    }

    this._subscriptions.add(
      this.service.selectAll().subscribe()
    );

    this._subscriptions.add(
      this.route.queryParams.pipe(
        filter(params => params[QueryParamsEnum.ProgramId]),
        tap(params => {
          this.control.setValue(+params[QueryParamsEnum.ProgramId]);
        })
      ).subscribe()
    );

    this.filteredPrograms$ = this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => {
          return this.query.selectAll().pipe(
            map(programs => {
              if (typeof this.control.value === 'number') {
                const program = programs.find(x => x.id === this.control.value);
                if (program) {
                  this.control.setValue(program);
                }
              }
              return value ? this._filterPrograms(value, programs) : programs.slice();
            })
          );
        })
      );
  }

  clearUnselectedValue() {
    if (typeof this.control.value === 'string') {
      this.control.setValue('');
    }
  }

  displayFn(program?: ProgramInterface): string | undefined {
    return program ? program.program_title : undefined;
  }

  private _filterPrograms(value: string | ProgramInterface, programs: ProgramInterface[]): ProgramInterface[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      return programs.filter(program => program.program_title.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return programs.slice();
      // const filterValue = value.id;

      // return programs.filter(program => program.program_title.toLowerCase().indexOf(filterValue) === 0);
    }

  }

}
