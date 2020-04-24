import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { CrudServiceInterface } from '../../../crud/models/crud-service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'ch-filters',
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() service: CrudServiceInterface<any>;
  noFilters = new BehaviorSubject<boolean>(false);

  private _subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._subscriptions.add(
      this.route.queryParams.pipe(
        tap(params => {
          this.noFilters.next(Object.keys(params).length === 0);
          this.service.addFilter(params);
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  removeFilters() {
    this.router.navigate([], {
      queryParams: {}
    });
  }
}
