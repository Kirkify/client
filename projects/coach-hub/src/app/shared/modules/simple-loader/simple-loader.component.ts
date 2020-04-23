import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VerySimpleLoaderClass } from './models/very-simple-loader.class';

@Component({
  selector: 'ch-simple-loader',
  templateUrl: './simple-loader.component.html',
  styleUrls: [ './simple-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleLoaderComponent {
  @Input() loader: VerySimpleLoaderClass;

  cancel() {
    this.loader.cancel();
  }
}
