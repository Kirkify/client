import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectParam } from '../../../../../../../../shared/helpers/select-query-param.helper';
import { filterNil } from '@datorama/akita';
import { Observable } from 'rxjs';
import { CrudFormInterface } from '../../../../../../../../shared/modules/crud/models/crud-form.interface';

@Component({
  selector: 'ch-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {

  @ViewChild('form') form: CrudFormInterface;;

  programId$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.programId$ = selectParam(this.route).pipe(
      filterNil
    );
  }

  //
  // errMsg = new BehaviorSubject<SimpleMessageType>('');
  // loader = new VerySimpleLoaderClass();
  // programSubject = new Subject<ProgramInterface>();
  //
  // private _subscriptions = new Subscription();
  //
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private service: ProgramsService
  // ) {
  // }
  //
  // // destroy() {
  // //   this.loader.setLoadingStatus(true);
  // //   this.loader.setLoadingMessage('Deleting...');
  // //
  // //   this._subscriptions.add(
  // //     this.service.destroy(this.item).pipe(
  // //       tap(() => this.router.navigate([ '../' ], { relativeTo: this.route })),
  // //       finalize(() => this.loader.setLoadingStatus(false))
  // //     ).subscribe()
  // //   );
  // // }
  //
  // ngOnInit(): void {
  //   this._subscriptions.add(
  //     this.route.paramMap.pipe(
  //       switchMap(params => {
  //         this.errMsg.next('');
  //         this.loader.setLoadingStatus(true);
  //         const id = params.get('id');
  //
  //         return this.service.select(id).pipe(
  //           catchError(err => {
  //             this.errMsg.next(err);
  //             return throwError(err);
  //           }),
  //           tap(program => {
  //             this.form.setItem(program);
  //           }),
  //           finalize(() => this.loader.setLoadingStatus(false))
  //         );
  //       }),
  //     ).subscribe()
  //   );
  // }
  //
  // ngOnDestroy(): void {
  //   this._subscriptions.unsubscribe();
  // }
}

