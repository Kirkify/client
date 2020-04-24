import { CrudServiceInterface } from './crud-service.interface';
import { VerySimpleLoaderClass } from '../../simple-loader/models/very-simple-loader.class';
import { BehaviorSubject } from 'rxjs';
import { SimpleMessageType } from '../../simple-message/models/simple-message.type';
import { FormGroup } from '@angular/forms';
import { CanComponentDeactivateInterface } from '../../../../guards/can-deactivate/can-deactivate-guard.service';

export interface CrudFormInterface extends CanComponentDeactivateInterface {
  setItem: (item: any) => void;
  service: CrudServiceInterface<any>;
  loader: VerySimpleLoaderClass;
  msg: BehaviorSubject<SimpleMessageType>;
  formGroup: FormGroup;
}
