import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { LoginService } from '../../state/login.service';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { LoginQuery } from '../../state/login.query';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ch-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ LoginService ]
})
export class LoginFormComponent {

  @ViewChild('emailInput', { read: ElementRef }) emailInput: ElementRef<HTMLInputElement>;

  loader = new VerySimpleLoaderClass({
    loader: this.query.selectLoading()
  });

  formGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    rememberMe: true
  });

  error$ = this.query.selectError();

  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private query: LoginQuery,
  ) {
  }

  onSubmit() {

    if (this.formGroup.invalid) {
      return;
    }

    this._subscriptions.add(
      this.service.login({
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value,
        rememberMe: this.formGroup.get('rememberMe').value
      }).pipe(
        takeUntil(this.loader.getCancellableSubject()),
        catchError(() => {
          this.emailInput.nativeElement.focus();
          return EMPTY;
        })
      ).subscribe()
    );
  }

}
