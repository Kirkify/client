import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoachHubQuery } from '../../../../../../state/coach-hub/coach-hub.query';
import { Observable } from 'rxjs';
import { CoachBaseProfileInterface } from '../../../../../../models/coach-base-profile.interface';

@Component({
  selector: 'ch-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: [ './coach-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachProfileComponent implements OnInit {

  baseProfile$: Observable<CoachBaseProfileInterface>;

  constructor(private query: CoachHubQuery) {
    this.baseProfile$ = this.query.selectBaseProfile();
  }

  ngOnInit() {
  }

}
