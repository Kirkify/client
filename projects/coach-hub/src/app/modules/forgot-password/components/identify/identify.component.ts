import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../state/forgot-password.service';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SimpleMessageTypesEnum } from '../../../../shared/modules/simple-message/models/simple-message-types.enum';
import { SimpleMessageType } from '../../../../shared/modules/simple-message/models/simple-message.type';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import ReCaptcha = ReCaptchaV2.ReCaptcha;

@Component({
  selector: 'ch-identify',
  templateUrl: './identify.component.html',
  styleUrls: [ './identify.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentifyComponent implements OnInit, OnDestroy {
  @ViewChild('form', { read: ElementRef }) form: ElementRef<HTMLFormElement>;
  @ViewChild('captcha') captcha: ReCaptcha;

  loader = new VerySimpleLoaderClass({
    cancellable: false
  });

  formMsg = new BehaviorSubject<SimpleMessageType>('');
  subscriptions = new Subscription();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private service: ForgotPasswordService) {
  }

  ngOnInit() {
    // When landing on this page, an 'email' query param
    // can sometimes be available
    const email = this.route.snapshot.queryParamMap.get('email');

    this.formGroup = this.fb.group({
      email: [ email, [ Validators.required, Validators.email ] ]
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.forgotPassword(captchaResponse);
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.captcha.execute();
  }

  forgotPassword(captcha) {
    const email = this.formGroup.get('email').value;

    this.formMsg.next('');
    this.loader.setLoadingStatus(true);

    this.subscriptions.add(
      this.service.forgotPassword(email, captcha).pipe(
        catchError(err => {
          this.formMsg.next(err);
          this.captcha.reset();
          return throwError(err);
        }),
        tap(() => {
          this.form.nativeElement.reset();
          this.formMsg.next({
            msg: 'Check your email for a link to reset your password.',
            type: SimpleMessageTypesEnum.Success
          });
        }),
        finalize(() => this.loader.setLoadingStatus(false))
      ).subscribe()
    );
  }
}
