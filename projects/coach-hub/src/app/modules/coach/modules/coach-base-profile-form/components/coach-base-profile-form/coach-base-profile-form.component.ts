import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { genders } from '../../../../../app/shared/models/genders.helper';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { CoachBaseProfileInterface } from '../../../../../app/models/coach-base-profile.interface';
import { serverDate } from '../../../../../../shared/helpers/server-date.helper';
import { catchError, finalize, tap } from 'rxjs/operators';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { Router } from '@angular/router';
import { CoachService } from '../../../../../../state/coach/coach.service';
import { CoachQuery } from '../../../../../../state/coach/coach.query';

@Component({
  selector: 'ch-coach-base-profile-form',
  templateUrl: './coach-base-profile-form.component.html',
  styleUrls: [ './coach-base-profile-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachBaseProfileFormComponent implements OnInit {
  @ViewChild('formRef') formRef: FormGroupDirective;
  @Output() updated = new EventEmitter<boolean>();
  @Input() submitEvent: Observable<void>;

  formGroup: FormGroup;
  genders = genders;
  loader = new VerySimpleLoaderClass();
  errorMsg = new BehaviorSubject<SimpleMessageType>('');
  isAnUpdateRequest = false;
  imageUrl = '';

  private _subscriptions = new Subscription();
  private _id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CoachService,
    private query: CoachQuery
  ) {
    this.formGroup = this.fb.group({
      name: [ '', Validators.required ],
      username: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(15) ] ],
      gender: [ '', [ Validators.required ] ],
      date_of_birth: [ [], [ Validators.required ] ],
      profile_pic: ''
    });
  }

  ngOnInit() {
    if (this.submitEvent) {
      this.submitEvent.pipe(
        tap(() => this.formRef.ngSubmit.emit())
      ).subscribe();
    }
    this.query.selectBaseProfile$.pipe(
      tap(profile => {
        if (profile) {
          this.isAnUpdateRequest = true;
          this._id = profile.id;
          this.formGroup.patchValue(profile);
          this.imageUrl = profile.avatar_url;
        }
      })
    ).subscribe();
  }

  onFileInput(ev) {
    console.log(ev);
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const value: Partial<CoachBaseProfileInterface> = {
      name: this.formGroup.get('name').value,
      username: this.formGroup.get('username').value,
      date_of_birth: serverDate(this.formGroup.get('date_of_birth').value),
      gender: this.formGroup.get('gender').value,
      profile_pic: this.formGroup.get('profile_pic').value
    };


    this.errorMsg.next('');
    this.loader.setLoadingStatus(true);

    if (this.isAnUpdateRequest) {
      this.updateCoachProfile(value);
    } else {
      this.createCoachProfile(value);
    }
  }

  createCoachProfile(value: Partial<CoachBaseProfileInterface>) {
    this.loader.setHasBackground(true);

    this._subscriptions.add(
      this.service.createNewCoachProfile(value).pipe(
        finalize(() => this.loader.setLoadingStatus(false)),
        tap(() => {
          this.updated.emit(true);
        }),
        catchError(err => {
          this.errorMsg.next(err);
          return throwError(err);
        }),
      ).subscribe()
    );
  }

  updateCoachProfile(value: Partial<CoachBaseProfileInterface>) {
    this.loader.setHasBackground(false);

    this._subscriptions.add(
      this.service.updateNewCoachProfile(this._id, value).pipe(
        finalize(() => this.loader.setLoadingStatus(false)),
        tap(() => {
          this.updated.emit(true);
        }),
        catchError(err => {
          this.errorMsg.next(err);
          return throwError(err);
        }),
      ).subscribe()
    );
  }
}
