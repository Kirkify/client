import { DataSource } from '@angular/cdk/collections';
import { merge, Observable } from 'rxjs';
import { TagInterface } from '../../models/tag.interface';
import { TagsQuery } from '../../state/tags.query';
import { TagsService } from '../../services/tags.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TagsTableDataSource extends DataSource<TagInterface> {

  constructor(
    private query: TagsQuery,
    private service: TagsService,
    private paginator: MatPaginator,
    private sort: MatSort
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TagInterface[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.query.selectAll(),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(): Observable<TagInterface[]> {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   console.log(startIndex);
  //   return this.service.selectAll().pipe(
  //     tap(programs => {
  //       // Set the paginator's length
  //       this.paginator.length = programs.length;
  //     })
  //   );
  //   // return data.splice(startIndex, this.paginator.pageSize);
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TagInterface[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
