import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RootRoutesEnum } from '../../../../root-routes.enum';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faYoutubeSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'ch-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  appName = environment.app_name;
  routes = RootRoutesEnum;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faYoutubeSquare = faYoutubeSquare;
  faGooglePlusSquare = faGooglePlusSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
