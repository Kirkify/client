import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VerySimpleLoaderClass } from '../../../simple-loader/models/very-simple-loader.class';
import { CrudRoutesEnum } from '../../crud-routes.enum';
import { CrudServiceInterface } from '../../models/crud-service.interface';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { auditTime, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ch-crud-main',
  templateUrl: './crud-main.component.html',
  styleUrls: [ './crud-main.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudMainComponent implements OnInit, OnDestroy {

  @Input() title = 'Items';
  @Input() noItemsText = 'You have yet to create any items.';
  @Input() service: CrudServiceInterface<any>;
  @Input() createFunc: () => void = null;

  loader: VerySimpleLoaderClass;
  showTable$: Observable<boolean>;
  showRefresh$: Observable<boolean>;
  showNoItems$: Observable<boolean>;

  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.service) {
      console.error('A service must be passed in');
    }

    // Set Loader
    this.loader = new VerySimpleLoaderClass({
      loader: this.service.query.selectLoading()
    });

    this.fetchAll();

    const selectFetched = this.service.query.select(store => store.fetched);

    const selectHasItems = this.service.query.selectCount().pipe(
      map(count => count > 0)
    );

    this.showTable$ = combineLatest(
      selectFetched,
      selectHasItems,
      this.service.query.selectLoading()
    ).pipe(
      auditTime(100),
      map(([ fetched, hasItems, loading ]) => {
        return fetched && hasItems && !loading;
      })
    );

    this.showNoItems$ = combineLatest(
      selectFetched,
      selectHasItems,
      this.service.query.selectLoading()
    ).pipe(
      auditTime(100),
      map(([ fetched, hasItems, loading ]) => {
        return fetched && !hasItems && !loading;
      })
    );

    this.showRefresh$ = combineLatest(
      selectFetched,
      this.service.query.selectLoading()
    ).pipe(
      auditTime(100),
      map(([ fetched, loading ]) => {
        return !fetched && !loading;
      })
    );
  }

  fetchAll(force = false) {
    this._subscriptions.add(
      this.service.selectAll(force).pipe(
        takeUntil(this.loader.getCancellableSubject())
      ).subscribe()
    );
  }

  create() {
    if (this.createFunc) {
      this.createFunc();
    } else {
      this.router.navigate([ CrudRoutesEnum.Create ], {
        relativeTo: this.route
      });
    }
  }
}
