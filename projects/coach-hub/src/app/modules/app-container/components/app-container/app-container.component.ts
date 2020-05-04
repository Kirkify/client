import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ch-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: [ './app-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContainerComponent {
  assetUrl = environment.assets_url;
}
