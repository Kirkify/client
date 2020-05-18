import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ProfileInterface } from '../../models/profile.interface';
import { takeUntil, tap } from 'rxjs/operators';
import { filterNil } from '@datorama/akita';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { CanComponentDeactivateInterface } from '../../../../../../guards/can-deactivate/can-deactivate-guard.service';
import { MaskHelper } from '../../../../../../shared/helpers/mask.helper';
import { DialogService } from '../../../../../../services/dialog/dialog.service';
import { UserProfileQuery } from '../../state/user-profile.query';
import { AuthenticationService } from '../../../../../../state/authentication/authentication.service';

@Component({
  selector: 'ch-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, OnDestroy, CanComponentDeactivateInterface {
  genders = [
    { value: 'm', display: 'Male' },
    { value: 'f', display: 'Female' },
    { value: 'u', display: 'Prefer not to disclose' }
  ];
  phoneNumberMask = MaskHelper.phoneNumberMask;
  formGroup: FormGroup;
  loader: VerySimpleLoaderClass;
  formMsg = new BehaviorSubject<SimpleMessageType>('');
  redirectTo: string;

  private _subscriptions = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private userProfileQuery: UserProfileQuery,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // Set the loader
    this.loader = new VerySimpleLoaderClass({
      loader: this.userProfileQuery.selectLoading()
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.formGroup.dirty) {
      return this.dialogService.unsavedChangesConfirmation();
    }
    return true;
  }

  ngOnInit() {
    // TODO: Update to a global constant
    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');

    this.formGroup = this.fb.group({
      phone_number: [ '', [ Validators.maxLength(255) ] ],
      date_of_birth: [ '', [ Validators.required ] ],
      gender: [ '', [ Validators.required ] ],
      street_number: [ '', [ Validators.required ] ],
      street_name: [ '', [ Validators.required ] ],
      apt_number: [ '' ],
      city: [ '', [ Validators.required ] ],
      province: [ '', [ Validators.required ] ],
      postal_code: [ '', [ Validators.required ] ],
    });

    this._subscriptions.add(
      this.userProfileQuery.selectProfile$.pipe(
        filterNil,
        tap(profile => {
          this.formGroup.patchValue(profile);
        })
      ).subscribe()
    );

    if (!this.userProfileQuery.getValue().fetched) {
      this.loader.setLoadingMessage('Fetching your profile');

      this._subscriptions.add(
        this.userService.getProfile()
          .pipe(
            takeUntil(this.loader.getCancellableSubject())
          )
          .subscribe()
      );
    }
  }


  onSubmit() {
    if (this.formGroup.invalid) {
      this.formMsg.next('Please fill all required fields');
      return;
    }

    const profile = {
      ...this.formGroup.value
    } as Partial<ProfileInterface>;

    this.formMsg.next('');
    this.loader.setLoadingMessage('Updating your profile');

    this._subscriptions.add(
      this.userService.updateProfile(profile)
        .pipe(
          takeUntil(this.loader.getCancellableSubject()),
        )
        .subscribe(() => {
            // We need to make sure we can deactivate the page since it was successfully updated
            this.formGroup.markAsPristine();
          },
          err => {
            this.formMsg.next(err);
          }
        )
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
