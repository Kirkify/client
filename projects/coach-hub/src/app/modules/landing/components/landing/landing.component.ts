import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AppRoutesEnum } from '../../../../app-routes.enum';

@Component({
  selector: 'ch-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  title = environment.app_name;
  routes = AppRoutesEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
