import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ch-min-character-displayer',
  templateUrl: './min-character-displayer.component.html',
  styleUrls: [ './min-character-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinCharacterDisplayerComponent {
  @Input() minLength = 140;
  @Input() length: number;

  constructor() { }
}
