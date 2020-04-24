import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ColumnDisplayInterface } from '../../models/column-display.interface';

@Component({
  selector: 'ch-cell-display',
  templateUrl: './cell-display.component.html',
  styleUrls: ['./cell-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDisplayComponent implements OnInit {

  @Input() item: any;
  @Input() display: ColumnDisplayInterface;

  constructor() { }

  ngOnInit() {
  }

  get getRoute() {
    if (this.display.linkableRoute) {
      return this.display.linkableRoute(this.item);
    } else {
      return this.item.id;
    }
  }
}
