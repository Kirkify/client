import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../state/forgot-password.service';
import { ResetPasswordInterface } from '../../models/reset-password.interface';
import { equalValidator } from '../../../../shared/validators/equalValidator';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../shared/modules/simple-message/models/simple-message.type';
import { AuthenticationService } from '../../../../state/authentication/authentication.service';
import { LoginInterface } from '../../../../state/authentication/models/login.interface';

@Component({
  selector: 'ch-reset',
  templateUrl: './reset.component.html',
  styleUrls: [ './reset.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent implements OnInit, OnDestroy {
  loader = new VerySimpleLoaderClass({
    cancellable: false,
    message: 'Attempting to reset your password...'
  });
  formMsg = new BehaviorSubject<SimpleMessageType>('');
  formGroup: FormGroup;

  private _subscriptions = new Subscription();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private forgotPasswordService: ForgotPasswordService,
              private authService: AuthenticationService) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    // This should never happen from a valid user
    if (!email || !token) {
      this.formMsg.next('You must follow the address from the Forgot Password Email sent to you.');
    }

    // Create form
    this.formGroup = this.fb.group({
      email: [ email, [ Validators.required, Validators.email ] ],
      token: [ token, [ Validators.required ] ],
      passwords: this.fb.group({
        password: [ '', [ Validators.required, Validators.minLength(6) ] ],
        password_confirmation: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }, { validator: equalValidator }),
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    const email = this.formGroup.get('email').value;
    const token = this.formGroup.get('token').value;
    const passwordGroup = this.formGroup.get('passwords');
    const password = passwordGroup.get('password').value;
    // tslint:disable-next-line:variable-name
    const password_confirmation = passwordGroup.get('password_confirmation').value;

    const credentials: ResetPasswordInterface = {
      email,
      token,
      password,
      password_confirmation
    };

    this.formMsg.next('');
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      this.forgotPasswordService.validateResetToken(credentials)
        .pipe(
          catchError(err => {
            this.formMsg.next(err);
            return throwError(err);
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        )
        .subscribe()
    );
  }
}
