import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardService } from '../../state/dashboard.service';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { DashboardQuery } from '../../state/dashboard.query';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'ch-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  loader = new VerySimpleLoaderClass();

  private _subscriptions = new Subscription();

  constructor(
    public query: DashboardQuery,
    private service: DashboardService
  ) {
    if (! this.query.getValue().fetched) {
      this.loader.setLoadingStatus(true);

      this._subscriptions.add(
        this.service.fetchInitialState().pipe(
          finalize(() => this.loader.setLoadingStatus(false)),
          takeUntil(this.loader.getCancellableSubject()),
        ).subscribe()
      );
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
