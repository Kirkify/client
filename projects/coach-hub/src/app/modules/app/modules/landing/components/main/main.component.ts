import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoachHubRoutesEnum } from '../../../../coach-hub-routes.enum';
import { Observable } from 'rxjs';
import { CoachHubQuery } from '../../../../state/coach-hub/coach-hub.query';

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  routes = CoachHubRoutesEnum;
  isCoach: Observable<boolean>;

  constructor(private query: CoachHubQuery) {
    this.isCoach = this.query.selectIsCoach();
  }

  ngOnInit() {
  }

}
