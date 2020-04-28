import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudFormInterface } from '../../../../../../../../shared/modules/crud/models/crud-form.interface';
import { ActivatedRoute } from '@angular/router';
import { filterNil } from '@datorama/akita';
import { CanComponentDeactivateInterface } from '../../../../../../../../guards/can-deactivate/can-deactivate-guard.service';
import { selectParam } from '../../../../../../../../shared/helpers/select-query-param.helper';

@Component({
  selector: 'ch-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit, OnDestroy, CanComponentDeactivateInterface {
  @ViewChild('form') form: CrudFormInterface;

  programId$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.programId$ = selectParam(this.route).pipe(
      filterNil
    );
  }

  ngOnDestroy(): void {
    console.error('DESTROYING TO');
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.form.canDeactivate();
  }
}
