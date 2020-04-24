import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoachesQuery } from '../../state/coaches/coaches.query';
import { Observable } from 'rxjs';
import { CoachProfileInterface } from '../../../../models/coach-profile.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'ch-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachListComponent implements OnInit {

  coaches$: Observable<CoachProfileInterface[]>;

  constructor(
    private query: CoachesQuery,
    private service: SearchService) {
    this.coaches$ = this.query.selectAll();
  }

  ngOnInit() {
    this.service.selectAllCoaches().subscribe();
  }

}
