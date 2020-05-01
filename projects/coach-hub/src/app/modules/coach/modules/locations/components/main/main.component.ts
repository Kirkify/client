import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor(
    public service: LocationsService
  ) {
  }
}
