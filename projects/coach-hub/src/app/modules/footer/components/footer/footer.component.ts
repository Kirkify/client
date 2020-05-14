import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faYoutubeSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../../environments/environment';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';
import { PartnershipsQuery } from '../../../partnerships/state/partnerships.query';
import { LegalQuery } from '../../../legal/state/legal.query';

@Component({
  selector: 'ch-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  appName = environment.app_name;

  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faYoutubeSquare = faYoutubeSquare;
  faGooglePlusSquare = faGooglePlusSquare;

  constructor(
    public rootRoutingQuery: RootRoutingQuery,
    public partnershipsQuery: PartnershipsQuery,
    public legalQuery: LegalQuery
  ) { }

  ngOnInit(): void {
  }

}
