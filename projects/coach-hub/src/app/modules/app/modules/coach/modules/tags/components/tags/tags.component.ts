import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { TagsQuery } from '../../state/tags.query';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TagInterface } from '../../models/tag.interface';

@Component({
  selector: 'ch-tags',
  templateUrl: './tags.component.html',
  styleUrls: [ './tags.component.scss' ]
})
export class TagsComponent implements OnInit {
  tags$: Observable<TagInterface[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private tagsQuery: TagsQuery,
    private tagsService: TagsService
  ) {
  }

  ngOnInit() {
    this.tags$ = this.tagsQuery.selectAll();
    this.isLoading$ = this.tagsQuery.selectLoading();

    this.tagsQuery.selectLoading().pipe(
      tap(test => {
        console.log(test);
      })
    ).subscribe();
    // this.tagsService.get();
  }

  add(tag: TagInterface) {
    this.tagsService.add(tag);
  }

  update(id: ID, tag: Partial<TagInterface>) {
    this.tagsService.update(id, tag);
  }

  remove(id: ID) {
    this.tagsService.remove(id);
  }
}
