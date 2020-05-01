import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CoachProfileInterface } from '../../../../../app/models/coach-profile.interface';
import { CoachQuery } from '../../../../state/coach.query';
import { CoachProfileRoutesEnum } from '../../coach-profile-routes.enum';
import { map, tap } from 'rxjs/operators';
import { SportsQuery } from '../../../../../app/state/sports/sports.query';

@Component({
  selector: 'ch-coach-application-displayer',
  templateUrl: './coach-application-displayer.component.html',
  styleUrls: [ './coach-application-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachApplicationDisplayerComponent implements OnInit {
  newApplicationRoute = CoachProfileRoutesEnum.New;
  profiles: CoachProfileInterface[];
  selected: number;

  private _subscriptions = new Subscription();

  constructor(
    private query: CoachQuery,
    private sportsQuery: SportsQuery
  ) {
    this._subscriptions.add(
      this.query.select(store => store.profiles).pipe(
        tap(profiles => {
          this.profiles = profiles;

          if (!this.selected && this.profiles.length) {
            this.selected = this.profiles[0].id;
          }
        })
      ).subscribe()
    );
  }

  ngOnInit() {
  }

  getSportName(id: number | number[]) {
    const findId = Array.isArray(id) ? id[0] : id;
    const entity = this.sportsQuery.getEntity(findId);

    return entity ? entity.name : '';
  }

  getSelectedProfile() {
    return this.profiles.find(x => x.id === this.selected);
  }
}
