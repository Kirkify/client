import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { Subscription, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { equalValidator } from '../../../../shared/validators/equalValidator';
import { ResetPasswordInterface } from '../../../forgot-password/models/reset-password.interface';
import { catchError, finalize } from 'rxjs/operators';
import { ResetPasswordService } from '../../state/reset-password.service';
import { ResetPasswordQuery } from '../../state/reset-password.query';

@Component({
  selector: 'ch-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: [ './reset-password-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {

  loader = new VerySimpleLoaderClass({
    loader: this.query.selectLoading(),
    cancellable: false,
    message: 'Attempting to reset your password...'
  });
  errors$ = this.query.selectError();
  formGroup: FormGroup;

  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ResetPasswordService,
    private query: ResetPasswordQuery) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    // This should never happen from a valid user
    if (!email || !token) {
      this.service.raiseRoutingError();
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

    const passwordGroup = this.formGroup.get('passwords');

    const credentials: ResetPasswordInterface = {
      email: this.formGroup.get('email').value,
      token: this.formGroup.get('token').value,
      password: passwordGroup.get('password').value,
      password_confirmation: passwordGroup.get('password_confirmation').value
    };

    this._subscriptions.add(
      this.service.validateResetToken(credentials).subscribe()
    );
  }

}
