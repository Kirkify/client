import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GroupsQuery } from '../../../../../../state/groups/groups.query';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { CategoriesQuery } from '../../../../../../state/categories/categories.query';
import { InterestedInService } from '../../services/interested-in.service';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ch-interested-in',
  templateUrl: './interested-in.component.html',
  styleUrls: ['./interested-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestedInComponent implements OnInit {

  groups$ = this.groupsQuery.selectAll();
  loader = new VerySimpleLoaderClass();

  constructor(
    private groupsQuery: GroupsQuery,
    private categoriesQuery: CategoriesQuery,
    private service: InterestedInService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    const ids = this.categoriesQuery.getActiveId();

    this.loader.setLoadingStatus(true);

    this.service.updateInterests(ids).pipe(
      finalize(() => this.loader.setLoadingStatus(false)),
      takeUntil(this.loader.getCancellableSubject())
    ).subscribe();
  }
}
