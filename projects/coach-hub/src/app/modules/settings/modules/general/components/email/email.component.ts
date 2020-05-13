import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ChangeEmailInterface } from '../../models/change-email.interface';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { SimpleMessageTypesEnum } from '../../../../../../shared/modules/simple-message/models/simple-message-types.enum';
import { AuthenticationService } from '../../../../../../state/authentication/authentication.service';
import { AuthenticationQuery } from '../../../../../../state/authentication/authentication.query';

@Component({
  selector: 'ch-email',
  templateUrl: './email.component.html',
  styleUrls: [ './email.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  loader = new VerySimpleLoaderClass();
  formMsg = new BehaviorSubject<SimpleMessageType>('');
  forgotPasswordRoute = '/forgot-paasswword';
  userEmail$: Observable<string>;

  private _subscriptions = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private query: AuthenticationQuery,
    private fb: FormBuilder) {
    this.userEmail$ = this.query.selectUserEmail$;
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const user: ChangeEmailInterface = {
      email: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value
    };

    this.formMsg.next('');
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      // this.userService.updateEmail(user)
      //   .pipe(
      //     takeUntil(this.loader.getCancellableSubject()),
      //     finalize(() => this.loader.setLoadingStatus(false))
      //   )
      //   .subscribe(res => {
      //       this.formMsg.next({
      //         msg: `An email has been sent to ${ user.email }, please confirm your address by following the instructions in that email.`,
      //         type: SimpleMessageTypesEnum.Success
      //       });
      //     },
      //     err => {
      //       this.formMsg.next(err);
      //     }
      //   )
    );
  }

}
