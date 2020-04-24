import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, Subscription } from 'rxjs';
import { CrudServiceInterface } from '../../crud/models/crud-service.interface';
import { switchMap, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DisplayDataSource extends DataSource<any> {

  private _subscriptions = new Subscription();

  constructor(
    private service: CrudServiceInterface<any>,
    private paginator: MatPaginator,
    private sort: MatSort,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    const dataMutations = [
      this.service.selectTableValues(),
      // this.paginator.page,
      // this.sort.sortChange.pipe(
      //   tap(options => {
      //     this.service.sort(options);
      //   })
      // )
    ];

    return merge(...dataMutations).pipe(
      switchMap(() => {
        return this.service.selectTableValues();
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this._subscriptions.unsubscribe();
  }
}

/**
 * Paginate the data (client-side). If you're using server-side pagination,
 * this would be replaced by requesting the appropriate data from the server.
 */
// return this.getPagedData(this.getSortedData([...this.data]));

// private getPagedData(data: TestItem[]) {
//   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//   return data.splice(startIndex, this.paginator.pageSize);
// }
