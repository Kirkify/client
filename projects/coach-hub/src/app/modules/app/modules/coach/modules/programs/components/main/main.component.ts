import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor(
    public service: ProgramsService
  ) {
  }

  create() {
    console.log('test');
  }
}
