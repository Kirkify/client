import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SimpleMessageTypesEnum } from '../../simple-message/models/simple-message-types.enum';
import { CrudFormInterface } from './crud-form.interface';

export class CrudFormClass {

  private _component: CrudFormInterface;

  setComponent(component: CrudFormInterface) {
    this._component = component;
  }

  update(value: any) {
    this._component.loader.setLoadingMessage('Updating...');
    this._component.loader.setLoadingStatus(true);

    return this._component.service.update(value).pipe(
      takeUntil(this._component.loader.getCancellableSubject()),
      catchError(err => {
        this._component.msg.next(err);
        return throwError(err);
      }),
      tap(item => {
        this._component.formGroup.markAsPristine();
        this._component.msg.next({
          msg: `${this._component.service.getItemName(item)} has been updated successfully`,
          type: SimpleMessageTypesEnum.Success
        });
      }),
      finalize(() => this._component.loader.setLoadingStatus(false))
    );
  }

  create(value: any) {
    this._component.loader.setLoadingMessage('Creating...');
    this._component.loader.setLoadingStatus(true);

    return this._component.service.create(value).pipe(
      takeUntil(this._component.loader.getCancellableSubject()),
      catchError(err => {
        this._component.msg.next(err);
        return throwError(err);
      }),
      tap(item => {
        this._component.formGroup.markAsPristine();
        this._component.msg.next({
          msg: `${this._component.service.getItemName(item)} has been created successfully`,
          type: SimpleMessageTypesEnum.Success
        });
      }),
      finalize(() => this._component.loader.setLoadingStatus(false))
    );
  }
}
