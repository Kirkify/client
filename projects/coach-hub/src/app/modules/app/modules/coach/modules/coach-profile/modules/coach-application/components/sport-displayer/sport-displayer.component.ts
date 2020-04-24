import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SportInterface } from '../../../../../../../../models/sport.interface';

@Component({
  selector: 'ch-sport-displayer',
  templateUrl: './sport-displayer.component.html',
  styleUrls: [ './sport-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportDisplayerComponent {
  @Input() value: number | number[];
  @Input() allSports: SportInterface[];

  constructor() {
  }

  getFirstValue(): string {
    if (typeof this.value === 'number') {
      const sport = this.allSports.find(x => x.id === this.value);
      if (sport) {
        return sport.name;
      }
    } else if (Array.isArray(this.value) && this.value.length) {
      if (this.allSports) {
        const sport = this.allSports.find(x => x.id === this.value[0]);
        if (sport) {
          return sport.name;
        }
      }
    }
    return '';
  }

  getAdditionalValues(): string {
    if (Array.isArray(this.value)) {
      let value: string;
      if (this.value.length === 2) {
        value = '1 other';
      } else {
        value = `${this.value.length - 1} others`;
      }
      return ` (+ ${value})`;
    }
    return '';
  }
}
