import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudFormInterface } from '../../../../../../../../shared/modules/crud/models/crud-form.interface';
import { CanComponentDeactivateInterface } from '../../../../../../../../guards/can-deactivate/can-deactivate-guard.service';

@Component({
  selector: 'ch-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements CanComponentDeactivateInterface {
  @ViewChild('form') form: CrudFormInterface;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.form.canDeactivate();
  }
}
