import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { VerySimpleLoaderClass } from '../../../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../../../shared/modules/simple-message/models/simple-message.type';
import { LocationsService } from '../../services/locations.service';
import { tap } from 'rxjs/operators';
import { CreateLocationInterface } from '../../models/create-location.interface';
import { LocationInterface } from '../../models/location.interface';
import { CrudFormInterface } from '../../../../../../../../shared/modules/crud/models/crud-form.interface';
import { CrudFormClass } from '../../../../../../../../shared/modules/crud/models/crud-form.class';
import { locationDisplayName } from '../../helpers/location-display-name';

@Component({
  selector: 'ch-location-form',
  templateUrl: './location-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationFormComponent extends CrudFormClass implements CrudFormInterface, OnInit, OnDestroy {

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
  loader = new VerySimpleLoaderClass();
  msg = new BehaviorSubject<SimpleMessageType>('');
  isAnUpdateRequest = false;

  private _item: LocationInterface;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    public service: LocationsService,
  ) {
    super();
    super.setComponent(this);
    this.formGroup = this.fb.group({
      name: [ [], [ Validators.required ] ],
      description:  '',
      street_number: [ [], [ Validators.required ] ],
      street_name: [ [], [ Validators.required ] ],
      apt_number: '',
      city: [ [], [ Validators.required ] ],
      province: [ [], [ Validators.required ] ],
      postal_code: [ [], [ Validators.required ] ],
      notes: ''
    });
  }

  ngOnInit() {
    // Simulate a submit if submit event is triggered by parent
    if (this.submitEvent) {
      this._subscriptions.add(
        this.submitEvent.pipe(
          tap(() => this.formRef.onSubmit(undefined))
        ).subscribe()
      );
    }
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

    const form: CreateLocationInterface = {
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      street_number: this.formGroup.get('street_number').value,
      street_name: this.formGroup.get('street_name').value,
      city: this.formGroup.get('city').value,
      postal_code: this.formGroup.get('postal_code').value,
      province: this.formGroup.get('province').value,
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

  private _update(form: CreateLocationInterface) {
    const value: LocationInterface = {
      // Add all properties of the program which was passed in
      ...this._item,
      // Overwrite all properties which have been updated
      ...form
    };

    this._subscriptions.add(
      super.update(value).pipe(
        tap(location => this.completed.emit(location.id))
      ).subscribe()
    );
  }

  private _create(value: CreateLocationInterface) {
    this._subscriptions.add(
      super.create(value).pipe(
        tap(location => this.completed.emit(location.id))
      ).subscribe()
    );
  }
}
