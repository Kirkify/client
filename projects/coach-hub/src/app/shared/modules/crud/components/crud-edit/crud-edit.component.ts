import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { VerySimpleLoaderClass } from '../../../simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../simple-message/models/simple-message.type';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { CrudFormInterface } from '../../models/crud-form.interface';
import { CanComponentDeactivateInterface } from '../../../../../guards/can-deactivate/can-deactivate-guard.service';
import { DialogService } from '../../../../../services/dialog/dialog.service';

@Component({
  selector: 'ch-crud-edit',
  templateUrl: './crud-edit.component.html',
  styleUrls: [ './crud-edit.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudEditComponent implements AfterContentInit, OnDestroy, CanComponentDeactivateInterface {
  @Input() title = 'Item';
  @Input() paramId = 'id';
  @ContentChild('form') formComponent: CrudFormInterface;

  errMsg = new BehaviorSubject<SimpleMessageType>('');
  loader = new VerySimpleLoaderClass();

  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
  }

  ngAfterContentInit(): void {
    this._subscriptions.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.errMsg.next('');
          this.loader.setLoadingStatus(true);
          const id = params.get(this.paramId);

          return this.formComponent.service.select(id).pipe(
            catchError(err => {
              this.errMsg.next(err);
              return throwError(err);
            }),
            tap(item => {
              this.formComponent.setItem(item);
            }),
            finalize(() => this.loader.setLoadingStatus(false))
          );
        }),
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.formComponent && !this.formComponent.canDeactivate()) {
      return this.formComponent.canDeactivate();
    }
    return true;
  }
}
