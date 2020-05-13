import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { SimpleMessageTypesEnum } from '../../../../../../shared/modules/simple-message/models/simple-message-types.enum';
import { CanComponentDeactivateInterface } from '../../../../../../guards/can-deactivate/can-deactivate-guard.service';
import { UserInterface } from '../../../../../../state/authentication/models/user.interface';
import { AuthenticationQuery } from '../../../../../../state/authentication/authentication.query';

@Component({
  selector: 'ch-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  loader = new VerySimpleLoaderClass();
  formMsg = new BehaviorSubject<SimpleMessageType>('');

  private _subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private query: AuthenticationQuery) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      first_name: [ '', [ Validators.required, Validators.maxLength(255) ] ],
      last_name: [ '', [ Validators.required, Validators.maxLength(255) ] ]
    });

    this._subscriptions.add(
      this.query.selectUser$
        .subscribe(user => {
          this.formGroup.get('first_name').setValue(user.first_name);
          this.formGroup.get('last_name').setValue(user.last_name);
        }));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const user = {
      first_name: this.formGroup.get('first_name').value,
      last_name: this.formGroup.get('last_name').value
    } as Partial<UserInterface>;

    this.formMsg.next('');
    this.loader.setLoadingMessage('Updating your name ...');
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      // this.userService.updateUser(user)
      //   .pipe(
      //     takeUntil(this.loader.getCancellableSubject()),
      //     finalize(() => this.loader.setLoadingStatus(false))
      //   )
      //   .subscribe(
      //     () => {
      //       // We need to make sure we can deactivate the page since it was successfully updated
      //       this.formGroup.markAsPristine();
      //       // Give user a success message
      //       this.formMsg.next({
      //         msg: 'Your name has been successfully updated.',
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
