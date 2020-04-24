import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VerySimpleLoaderClass } from '../simple-loader/models/very-simple-loader.class';
import { DataSource } from '@angular/cdk/table';
import { ColumnDisplayInterface } from './models/column-display.interface';
import { CrudServiceInterface } from '../crud/models/crud-service.interface';
import { DisplayDataSource } from './models/display-data-source';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'ch-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: [ './table-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() service: CrudServiceInterface<any>;

  @Input() dataSource: DataSource<any>;

  @Input() hasAction = true;

  @Input() minWidth: string | number = 'auto';

  @Input() deleteNameFunc: (item: any) => string;

  loader: VerySimpleLoaderClass;

  displayedColumns: string[];

  /**
   * Columns displayed in the table. Columns IDs can be added, removed, or reordered
   */
  private _columns: ColumnDisplayInterface[] = [];
  @Input('columns')
  set columns(value: ColumnDisplayInterface[]) {
    this._columns = value;
    this.displayedColumns = this.hasAction ? ['actions', ...this._columns.map(x => x.columnName)] : this._columns.map(x => x.columnName);


    // for (const column of value) {
    //   if (column.sortable && column.activeSort) {
    //     this.sort.active = column.columnName;
    //     this.sort.direction = column.activeSortDirection;
    //     break;
    //   }
    // }
  }
  get columns() {
    return this._columns;
  }

  private _subscriptions = new Subscription();

  delete(item: any) {
    this._subscriptions.add(
      this.service.destroy(item).subscribe()
    );
  }

  ngOnInit(): void {
    if (!this.service) {
      console.error('A Crud Service Interface must be passed in');
    }

    this.dataSource = new DisplayDataSource(this.service, this.paginator, this.sort);

    const isDeleting = this.service.query.select(store => store.isDeleting);

    this.loader = new VerySimpleLoaderClass({
      loader: isDeleting
    });


  }

  ngAfterViewInit(): void {
    console.log(this.paginator);
    for (const column of this._columns) {
      if (column.sortable && column.activeSort) {
        this.sort.sortChange.emit({
          active: column.columnName,
          direction: column.activeSortDirection
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
