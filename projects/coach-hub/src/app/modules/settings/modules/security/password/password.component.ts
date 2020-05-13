import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { equalValidator } from '../../../../../shared/validators/equalValidator';
import { SecurityService } from '../services/security.service';
import { VerySimpleLoaderClass } from '../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../shared/modules/simple-message/models/simple-message.type';
import { SimpleMessageTypesEnum } from '../../../../../shared/modules/simple-message/models/simple-message-types.enum';
import { UpdatePasswordInterface } from '../models/update-password.interface';

@Component({
  selector: 'ch-password',
  templateUrl: './password.component.html',
  styleUrls: [ './password.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  loader = new VerySimpleLoaderClass();
  formMsg = new BehaviorSubject<SimpleMessageType>('');

  private _subscriptions = new Subscription();

  constructor(
    private service: SecurityService,
    private fb: FormBuilder) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      current_password: [ '', [ Validators.required ] ],
      passwords: this.fb.group({
        password: [ '', [ Validators.required, Validators.minLength(6) ] ],
        password_confirmation: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }, { validator: equalValidator }),
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const passwordsGroup = this.formGroup.get('passwords');

    const newPassword = {
      current_password: this.formGroup.get('current_password').value,
      password: passwordsGroup.get('password').value,
      password_confirmation: passwordsGroup.get('password_confirmation').value
    } as UpdatePasswordInterface;

    this.formMsg.next('');
    this.loader.setLoadingMessage('Updating your password ...');
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      this.service.updatePassword(newPassword)
        .pipe(
          takeUntil(this.loader.getCancellableSubject()),
          catchError(err => {
            this.formMsg.next(err);
            return throwError(err);
          }),
          tap(() => {
            this.formMsg.next({
              msg: 'Your password has been successfully updated.',
              type: SimpleMessageTypesEnum.Success
            });
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        )
        .subscribe()
    );
  }
}
