import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ch-landing',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
}
