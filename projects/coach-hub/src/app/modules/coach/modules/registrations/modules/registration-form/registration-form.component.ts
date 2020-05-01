import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RegistrationsService } from '../../services/registrations.service';
import { CreateRegistrationInterface } from '../../models/create-registration.interface';
import { RegistrationInterface } from '../../models/registration.interface';
import { registrationDisplayName } from '../../helpers/registration-display-name';
import { CrudFormClass } from '../../../../../../shared/modules/crud/models/crud-form.class';
import { CrudFormInterface } from '../../../../../../shared/modules/crud/models/crud-form.interface';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { UiQuery } from '../../../../../../state/ui/ui.query';
import { serverDate } from '../../../../../../shared/helpers/server-date.helper';
import { ProgramInterface } from '../../../../../app/models/program.interface';

@Component({
  selector: 'ch-registration-form',
  templateUrl: './registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent extends CrudFormClass implements CrudFormInterface, OnDestroy {

  @Input('disabled')
  set disabled(disabled: boolean) {
    if (disabled) {
      this.formGroup.disable();
      this.hideSubmit = true;
    }
  }
  @Input() hideSubmit = false;
  @Input() submitEvent: Observable<void>;
  @Output() completed = new EventEmitter<number>();
  @ViewChild('formRef') formRef: FormGroupDirective;

  formGroup: FormGroup;
  programControl: AbstractControl;

  loader = new VerySimpleLoaderClass();
  msg = new BehaviorSubject<SimpleMessageType>('');
  isAnUpdateRequest = false;

  isScreenMobile: Observable<boolean>;
  startDate = new Date(1992, 0, 1);

  private _item: RegistrationInterface;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    public service: RegistrationsService,
    private uiQuery: UiQuery
  ) {
    super();
    super.setComponent(this);

    this.isScreenMobile = this.uiQuery.selectIsScreenWidthSmall();

    this.formGroup = this.fb.group({
      program_id: [ '', [ Validators.required ] ],
      first_name: [ '', [ Validators.required ] ],
      last_name:  [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      date_of_birth: ['', [ Validators.required ] ],
      notes: ''
    });

    this.programControl = this.formGroup.get('program_id');
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  setItem(item: any) {
    this._item = item;
    this.formGroup.patchValue(this._item);
    this.isAnUpdateRequest = true;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const form: CreateRegistrationInterface = {
      program_id: (this.programControl.value as ProgramInterface).id,
      first_name: this.formGroup.get('first_name').value,
      last_name: this.formGroup.get('last_name').value,
      email: this.formGroup.get('email').value,
      date_of_birth: serverDate(this.formGroup.get('date_of_birth').value),
      notes: this.formGroup.get('notes').value,
    };

    if (this.isAnUpdateRequest) {
      this._update(form);
    } else {
      this._create(form);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.canDeactivate(!this.formGroup.dirty);
  }

  private _update(form: CreateRegistrationInterface) {
    const value: RegistrationInterface = {
      // Add all properties of the program which was passed in
      ...this._item,
      // Overwrite all properties which have been updated
      ...form
    };

    this._subscriptions.add(
      super.update(value).subscribe()
    );
  }

  private _create(value: CreateRegistrationInterface) {
    this._subscriptions.add(
      super.create(value).subscribe()
    );
  }
}

