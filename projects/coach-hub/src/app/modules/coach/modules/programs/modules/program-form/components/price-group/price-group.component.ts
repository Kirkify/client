import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { debounce, tap } from 'rxjs/operators';
import { ID, guid } from '@datorama/akita';
@Component({
  selector: 'ch-price-group',
  templateUrl: './price-group.component.html',
  styleUrls: [ './price-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PriceGroupComponent implements OnInit, OnDestroy {

  @Output() remove = new EventEmitter<AbstractControl>();
  @Output() addSubOption = new EventEmitter<AbstractControl>();
  @Input() formGroup: FormGroup;
  @Input() canRemove: boolean;
  @Input() isSubOption: boolean;
  @Input() index: number;
  @Input() parentFormGroup: FormGroup;

  get disabled() {
    return this.formGroup.disabled;
  }

  get subOptions() {
    return this.formGroup.get('sub_options_values_form') as FormArray;
  }

  get subOptionsLength() {
    if (this.subOptions && this.subOptions.controls) {
      return this.subOptions.controls.length;
    }
    return 0;
  }

  get subOptionsPreset() {
    return this.formGroup.get('sub_options_preset');
  }

  get isSubOptionPresetMulti() {
    return this.subOptionsPreset.value === 2;
  }

  get minSubOptionsArray() {
    const requiredSubOptions = [2];
    if (this.subOptionsLength > 3) {
      for (let i = 3; i < this.subOptionsLength; i++) {
        requiredSubOptions.push(i);
      }
    }
    return requiredSubOptions;
  }

  get capacityArray() {
    const capacity = [];
    let capacityLength = 200;
    if (this.isSubOption) {
      capacityLength = this.parentFormGroup.get('capacity').value + 1;
    }

    for (let i = 1; i < capacityLength; i++) {
      capacity.push(i);
    }

    return capacity;
  }

  private _subscriptions = new Subscription();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.subOptions) {
      this._subscriptions.add(
        this.subOptions.valueChanges.pipe(
          debounce(() => timer(250)),
          tap(() => {
            const presetValue = this.subOptionsPreset.value;

            if (presetValue === 1 && this.subOptions.controls.length === 1) {
              this.subOptionsPreset.setValue(0);
            } else if (presetValue === 2 && this.subOptions.controls.length === 2) {
              this.subOptionsPreset.setValue(1);
            } else if (presetValue === 2) {
              const control = this.formGroup.get('multi_sub_options_required');
              if (control.value === this.subOptions.controls.length) {
                control.setValue(this.subOptions.controls.length - 1);
              }
            }

            this.cd.detectChanges();
          })
        ).subscribe()
      );
    }

    this._subscriptions.add(
      this.subOptionsPreset.valueChanges.pipe(
        tap(value => {
          if (value === 2 || value === 1) {
            const subOptionsLength = this.subOptions.controls.length;
            const minRequiredPlus1 = value + 1;
            if (subOptionsLength < minRequiredPlus1) {
              for (let i = 0; i < (minRequiredPlus1 - subOptionsLength); i++) {
                this.triggerAddSubOption();
              }
            }
          }
          if (value !== 2) {
            this.formGroup.get('multi_sub_options_required').setValue(2);
          }
        })
      ).subscribe()
    );

    // this._subscriptions.add(
    //   this.formGroup.get('multi_sub_options_required').
    // );


    if (this.isSubOption) {
      this._subscriptions.add(
        this.parentFormGroup.get('capacity').valueChanges.pipe(
          tap(value => {
            const capacity = this.formGroup.get('capacity');
            if (capacity.value > value) {
              capacity.setValue(value);
            }
          })
        ).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  triggerAddSubOption() {
    this.addSubOption.emit(this.formGroup);
  }
}

