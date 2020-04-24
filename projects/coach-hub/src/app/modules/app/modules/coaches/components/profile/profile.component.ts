import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { CoachPortfolioQuery } from '../../state/coach-portfolio.query';
import { CoachPortfolioService } from '../../services/coach-portfolio.service';
import { filterNil } from '@datorama/akita';
import { CoachPortfolioInterface } from '../../models/coach-portfolio.interface';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';

@Component({
  selector: 'ch-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  coachPortfolio$: Observable<CoachPortfolioInterface>;
  loader = new VerySimpleLoaderClass({cancellable: false});
  errMsg = new BehaviorSubject<SimpleMessageType>('');
  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private query: CoachPortfolioQuery,
    private service: CoachPortfolioService
  ) {}

  ngOnInit() {
    this.coachPortfolio$ = this.query.selectActive();

    this._subscriptions.add(
      this.route.paramMap.pipe(
        map((params: ParamMap) => params.get('username')),
        tap(username => this.service.setActive(username)),
        switchMap(username => {
          this.loader.setLoadingStatus(true);
          this.errMsg.next('');

          return this.service.selectCoach(username).pipe(
            catchError(err => {
              this.errMsg.next(err);
              return throwError(err);
            }),
            finalize(() => this.loader.setLoadingStatus(false))
          );
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
