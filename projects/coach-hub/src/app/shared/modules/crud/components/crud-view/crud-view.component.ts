import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { VerySimpleLoaderClass } from '../../../simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../simple-message/models/simple-message.type';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { CrudFormInterface } from '../../models/crud-form.interface';
import { CanComponentDeactivateInterface } from '../../../../../guards/can-deactivate/can-deactivate-guard.service';

@Component({
  selector: 'ch-crud-view',
  templateUrl: './crud-view.component.html',
  styleUrls: [ './crud-view.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudViewComponent implements AfterContentInit, OnDestroy, CanComponentDeactivateInterface {
  @Input() title = 'Item';
  @Input() paramId = 'id';
  @ContentChild('form') formComponent: CrudFormInterface;

  id: string;
  item: any;
  errMsg = new BehaviorSubject<SimpleMessageType>('');
  loader = new VerySimpleLoaderClass();

  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  destroy() {
    this.loader.setLoadingStatus(true);
    this.loader.setLoadingMessage('Deleting...');

    this._subscriptions.add(
      this.formComponent.service.destroy(this.item).pipe(
        tap(() => this.router.navigate([ '../' ], { relativeTo: this.route })),
        finalize(() => this.loader.setLoadingStatus(false))
      ).subscribe()
    );
  }

  ngAfterContentInit(): void {
    this._subscriptions.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.errMsg.next('');
          this.loader.setLoadingStatus(true);
          this.id = params.get(this.paramId);

          return this.formComponent.service.select(this.id).pipe(
            catchError(err => {
              this.errMsg.next(err);
              return throwError(err);
            }),
            tap(item => {
              this.item = item;
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
