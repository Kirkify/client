import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ch-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
}
