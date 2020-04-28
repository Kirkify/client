import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProgramInterface } from '../../../../../app/models/program.interface';

@Component({
  selector: 'ch-program-displayer',
  templateUrl: './program-displayer.component.html',
  styleUrls: [ './program-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramDisplayerComponent implements OnInit {

  @Input() program: ProgramInterface;

  constructor() { }

  ngOnInit() {
  }

  getProgramLink(): string {
    return `programs/${this.program.id}`;
  }
}
