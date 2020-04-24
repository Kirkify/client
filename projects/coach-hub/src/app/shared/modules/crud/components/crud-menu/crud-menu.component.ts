import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ch-crud-menu',
  templateUrl: './crud-menu.component.html',
  styleUrls: [ './crud-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudMenuComponent {

  @Output() refresh = new EventEmitter();
  @Output() create = new EventEmitter();
}
