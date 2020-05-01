import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createPriceFormArray, createPriceFormGroup } from '../../models/create-price-form.helper';
import { tap } from 'rxjs/operators';
import { ProgramPriceInterface } from '../../../../../../../app/models/program-price.interface';
import { DialogService } from '../../../../../../../../services/dialog/dialog.service';

@Component({
  selector: 'ch-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: [ './price-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PriceListComponent implements OnDestroy {
  @Input() formGroup: FormGroup;

  @Input() disabled: boolean;

  @Input('programPrices')
  set programPrices(programPrices: ProgramPriceInterface[]) {
    if (this.formGroup) {

      let pricesArray;
      // If we have program prices
      if (programPrices.length) {
        pricesArray = createPriceFormArray(this.formBuilder, programPrices);
      } else {
        pricesArray = this.formBuilder.array([createPriceFormGroup(this.formBuilder)]);
      }

      if (this.formGroup.contains('prices_form')) {
        this.formGroup.removeControl('prices_form');
      }

      this.formGroup.addControl('prices_form', pricesArray);
      this._formArray = this.formGroup.get('prices_form') as FormArray;

      if (this.disabled && programPrices.length) {
        for (const arr of this._formArray.controls) {
          if (arr instanceof FormGroup) {
            arr.disable();
          }
        }
      }
    }
  }

  get controls() {
    if (this._formArray) {
      return this._formArray.controls;
    }
    return [];
  }

  get canRemove() {
    return this.controls.length > 1;
  }

  private _formArray: FormArray;
  private _subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  add() {
    this._formArray.controls.push(createPriceFormGroup(this.formBuilder));
  }

  addSubOption(formGroup: FormGroup) {
    (formGroup.get('sub_options_values_form') as FormArray).push(createPriceFormGroup(this.formBuilder));
    // this.changeDetectorRef.detectChanges();
  }

  remove(formGroup: FormGroup) {
    // TODO: Check to make sure there is no info associated,
    // It could be clean (untouched) but have info from the server
    if (formGroup.dirty) {
      const name = formGroup.get('name').value;
      const msg = name ? `Pricing option ${name}` : 'Pricing option';
      this._subscriptions.add(
        this.dialogService.deleteConfirmation(msg).pipe(
          tap(result => {
            if (result) {
              this._removeFormGroup(formGroup);
            }
          })
        ).subscribe()
      );
    } else {
      this._removeFormGroup(formGroup);
    }
  }

  private _removeFormGroup(formGroup: FormGroup) {
    const mainIndex = this._formArray.controls.indexOf(formGroup);

    if (mainIndex !== -1) {
      this._formArray.removeAt(mainIndex);
    } else {
      for (const arr of this._formArray.controls) {
        const subOptions = arr.get('sub_options_values_form') as FormArray;
        if (subOptions) {
          const subIndex = subOptions.controls.indexOf(formGroup);
          if (subIndex !== -1) {
            subOptions.removeAt(subIndex);
            break;
          }
        }
      }
    }
  }
}
