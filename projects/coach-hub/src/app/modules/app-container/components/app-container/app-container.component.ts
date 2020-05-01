import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ch-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: [ './app-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContainerComponent {
}
