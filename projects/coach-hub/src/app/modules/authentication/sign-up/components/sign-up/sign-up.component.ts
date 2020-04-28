import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { VerySimpleLoaderClass } from '../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SignUpRoutesEnum } from '../../sign-up-routes.enum';
import { equalValidator } from '../../../../../shared/validators/equalValidator';
import { SignUpService } from '../../state/sign-up.service';
import { SignUpQuery } from '../../state/sign-up.query';
import { SignUpInterface } from '../../../../../state/authentication/models/sign-up.interface';
import ReCaptcha = ReCaptchaV2.ReCaptcha;

@Component({
  selector: 'ch-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  @ViewChild('captcha') captcha: ReCaptcha;

  loader = new VerySimpleLoaderClass({
    loader: this.query.selectLoading(),
    cancellable: false
  });

  errors$ = this.query.selectError();
  formGroup: FormGroup;

  private _subscriptions = new Subscription();

  constructor(
    private service: SignUpService,
    private router: Router,
    private route: ActivatedRoute,
    private query: SignUpQuery,
    private fb: FormBuilder) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      first_name: [ '', [ Validators.required, Validators.maxLength(255) ] ],
      last_name: [ '', [ Validators.required, Validators.maxLength(255) ] ],
      emails: this.fb.group({
        email: [ '', [ Validators.required, Validators.email ] ],
        email_confirmation: [ '', [ Validators.required, Validators.email ] ]
      }, { validator: equalValidator }),
      passwords: this.fb.group({
        password: [ '', [ Validators.required, Validators.minLength(6) ] ],
        password_confirmation: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }, { validator: equalValidator }),
      confirm_terms: [ '', [ Validators.requiredTrue ] ]
    });
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.signUp(captchaResponse);
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.captcha.execute();
  }

  signUp(captcha) {
    const emailGroup = this.formGroup.get('emails');
    const email = emailGroup.get('email').value;
    const passwordGroup = this.formGroup.get('passwords');

    const user: SignUpInterface = {
      first_name: this.formGroup.get('first_name').value,
      last_name: this.formGroup.get('last_name').value,
      email,
      email_confirmation: emailGroup.get('email_confirmation').value,
      password: passwordGroup.get('password').value,
      password_confirmation: passwordGroup.get('password_confirmation').value,
      captcha
    };

    this._subscriptions.add(
      this.service.signUp(user)
        .pipe(
          catchError(() => {
            this.captcha.reset();
            return EMPTY;
          }),
          tap(() => {
            this.router.navigate(
              [ `./${ SignUpRoutesEnum.VerifyEmail }` ],
              {
                queryParams: { email: user.email },
                relativeTo: this.route
              }
            );
          })
        ).subscribe()
    );
  }
}
