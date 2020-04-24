import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RootRoutesEnum } from '../../../../root-routes.enum';

@Component({
  selector: 'ch-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  appName = environment.app_name;
  routes = RootRoutesEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
