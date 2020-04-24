import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegistrationsService } from '../../services/registrations.service';

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor(
    public service: RegistrationsService
  ) {
  }
}
