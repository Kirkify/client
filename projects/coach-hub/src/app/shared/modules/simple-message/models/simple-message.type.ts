import { HttpErrorResponse } from '@angular/common/http';
import { SimpleMessageTypesEnum } from './simple-message-types.enum';
import { FormGroup } from '@angular/forms';

interface SimpleMessageInterface {
  msg: string | HttpErrorResponse;
  type?: SimpleMessageTypesEnum;
}

export type SimpleMessageType = SimpleMessageInterface | HttpErrorResponse | FormGroup | string;
