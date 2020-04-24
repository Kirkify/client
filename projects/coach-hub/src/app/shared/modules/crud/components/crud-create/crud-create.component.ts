import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ch-crud-create',
  templateUrl: './crud-create.component.html',
  styleUrls: [ './crud-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudCreateComponent implements OnInit {
  @Input() title = 'Item';

  constructor() { }

  ngOnInit() {
  }

}
