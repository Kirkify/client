import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { VerySimpleLoaderClass } from '../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SignUpService } from '../../state/sign-up.service';
import { SignUpQuery } from '../../state/sign-up.query';

@Component({
  selector: 'ch-verify',
  templateUrl: './verify.component.html',
  styleUrls: [ './verify.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyComponent implements OnInit, OnDestroy {
  loader = new VerySimpleLoaderClass({
    loader: this.query.selectLoading(),
    message: 'Verifying your email ...'
  });
  errors$ = this.query.selectError();
  formGroup: FormGroup;
  showEmailField = false;

  private _subscriptions = new Subscription();

  constructor(private service: SignUpService,
              private query: SignUpQuery,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    // When landing on this page, an 'email' query param should
    // always be available
    const email = this.route.snapshot.queryParamMap.get('email');
    // Token query param will only be available from
    // an email confirmation link
    const token = this.route.snapshot.queryParamMap.get('token');

    // TODO: Check this
    if (! email) {
      this.showEmailField = true;
    }

    // Set up form
    this.formGroup = this.fb.group({
      email: [ email, [ Validators.required, Validators.email ] ],
      token: [ token, [ Validators.required ] ]
    });

    this.verifyEmail();
  }

  get email() {
    return this.formGroup.get('email').value;
  }

  get token() {
    return this.formGroup.get('token').value;
  }

  verifyEmail() {
    if (this.formGroup.invalid) {
      return;
    }

    this._subscriptions.add(
      this.service.verify(this.email, this.token)
        .pipe(
          takeUntil(this.loader.getCancellableSubject()),
        )
        .subscribe()
    );
  }
}
// this.snackBar.open('Your email has been successfully verified', 'close', { duration: 6000 });
// this.router.navigate([ res ]);
