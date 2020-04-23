import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { SimpleMessageTypesEnum } from './models/simple-message-types.enum';
import { environment } from '../../../../environments/environment';
import { SimpleMessageType } from './models/simple-message.type';
import { BehaviorSubject } from 'rxjs';

class MessageDisplayer {
  msg = '';
  type = SimpleMessageTypesEnum.Danger;
  errors = [];

  private _inProduction = environment.production;

  constructor(message: SimpleMessageType) {
    if (!message) {
      return;
    }

    if (message instanceof FormGroup) {
      this.msg = this._extractFormGroupErrors(message);
      return;
    }

    // Check if there is a type
    if (typeof message !== 'string' && !(message instanceof HttpErrorResponse)) {
      if (message.type) {
        this.type = message.type;
      }
    }

    if (typeof message === 'string') {
      this.msg = message;
    } else if (message instanceof HttpErrorResponse) {
      this.msg = this._extractHttpError(message);
    } else if (typeof message.msg === 'string') {
      this.msg = message.msg;
    } else if (message.msg instanceof HttpErrorResponse) {
      this.msg = this._extractHttpError(message.msg);
    }
  }

  private _extractFormGroupErrors(formGroup: FormGroup): string {
    let message = '';
    if (formGroup.invalid) {
      for (const key of Object.keys(formGroup.controls)) {
        const control = formGroup.get(key);
        if (control && control.invalid) {
          this.errors.push(`${key} error`);
        }
      }
    }
    if (this.errors.length) {
      message = 'Please fix errors within the form';
    }
    return message;
  }

  private _extractHttpError(httpError: HttpErrorResponse) {
    // Create a generic error
    let msg = 'Unknown Error';
    if (httpError.status === 500 && this._inProduction) {
      return msg;
    } else if (typeof httpError.error === 'string') {
      return httpError.error;
    } else if (typeof httpError.error === 'object') {
      if (typeof httpError.error.message === 'string') {
        if (httpError.error.hasOwnProperty('message')) {
          // Update the generic error since we have a value
          msg = httpError.error.message;
        }
        if (typeof httpError.error.errors === 'object') {
          const errorList = httpError.error.errors;
          for (const key of Object.keys(errorList)) {
            for (const errMsg of errorList[ key ]) {
              this.errors.push(errMsg);
            }
          }
        }
        return msg;
      }
    }
  }
}

@Component({
  selector: 'ch-simple-message',
  templateUrl: './simple-message.component.html',
  styleUrls: [ './simple-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleMessageComponent {

  @Input('message')
  set message(value: SimpleMessageType) {
    const displayer = new MessageDisplayer(value);
    this.displayer.next(displayer);
  }

  displayer = new BehaviorSubject<MessageDisplayer>(null);
}


