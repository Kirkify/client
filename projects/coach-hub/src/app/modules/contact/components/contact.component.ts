import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { MaskHelper } from '../../../shared/helpers/mask.helper';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { ContactInterface } from '../models/contact.interface';
import { environment } from '../../../../environments/environment';
import { SimpleMessageType } from '../../../shared/modules/simple-message/models/simple-message.type';
import { SimpleMessageTypesEnum } from '../../../shared/modules/simple-message/models/simple-message-types.enum';
import { VerySimpleLoaderClass } from '../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { UserInterface } from '../../../state/authentication/models/user.interface';
import { AuthenticationQuery } from '../../../state/authentication/authentication.query';
import { RootRoutingQuery } from '../../../state/root-routing/root-routing.query';

@Component({
  selector: 'ch-contact',
  templateUrl: './contact.component.html',
  styleUrls: [ './contact.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('form') form;
  loader = new VerySimpleLoaderClass();
  formMsg = new BehaviorSubject<SimpleMessageType>('');
  appName = environment.app_name;
  formGroup: FormGroup;
  phoneNumberMask = MaskHelper.phoneNumberMask;

  private _user: UserInterface;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public rootRoutingQuery: RootRoutingQuery,
    private query: AuthenticationQuery) {
  }

  ngOnInit() {

    this.formGroup = this.fb.group({
      first_name: [ '', Validators.required ],
      last_name: [ '', Validators.required ],
      email: [ '', Validators.email ],
      phone_number: '',
      message: [ '', Validators.required ],
      prefer_call: [ false ]
    });

    this._subscriptions.add(
      this.query.selectUser$.pipe(
        tap(user => {
          this._user = user;
          this.updateFormWithUserValues();
        })
      ).subscribe()
    );
  }

  updateFormWithUserValues() {
    if (this._user) {
      this.formGroup.get('first_name').setValue(this._user.first_name);
      this.formGroup.get('last_name').setValue(this._user.last_name);
      this.formGroup.get('email').setValue(this._user.email);
    }
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formMsg.next('Please complete all required fields');
      return;
    }

    const user = { ...this.formGroup.value } as ContactInterface;

    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      this.contactService.contact(user)
        .pipe(
          takeUntil(this.loader.getCancellableSubject()),
          catchError(err => {
            this.formMsg.next(err);
            return throwError(err);
          }),
          tap(() => {
            this.form.nativeElement.reset();
            this.updateFormWithUserValues();
            this.formMsg.next({
              msg: 'Your contact response has been sent successfully, someone should be reaching out to you shortly.',
              type: SimpleMessageTypesEnum.Success
            });
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        ).subscribe()
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
