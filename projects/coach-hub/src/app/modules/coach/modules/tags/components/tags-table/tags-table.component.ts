import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: [ './tags-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsTableComponent implements OnInit {

  dataSource = [];

  constructor() { }

  ngOnInit() {
  }

}
