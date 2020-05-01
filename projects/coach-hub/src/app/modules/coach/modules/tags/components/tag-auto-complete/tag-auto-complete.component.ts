import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { TagInterface } from '../../models/tag.interface';
import { TagsQuery } from '../../state/tags.query';
import { TagsService } from '../../services/tags.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ch-tag-auto-complete',
  templateUrl: './tag-auto-complete.component.html',
  styleUrls: [ './tag-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TagAutoCompleteComponent implements OnInit, OnDestroy {

  @Input() preSelectedTags: number[] = [];
  @Output() tagsUpdated = new EventEmitter<TagInterface[]>();
  tags$: Observable<TagInterface[]>;
  isLoading$: Observable<boolean>;

  private _subscriptions = new Subscription();

  constructor(
    private query: TagsQuery,
    private service: TagsService
  ) {
    this.tags$ = this.query.selectAll();
    this.isLoading$ = this.query.selectLoading();
  }

  displayFunc = (item: TagInterface) => item.name;

  ngOnInit() {
    this._subscriptions.add(
      this.service.getAll().subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onTagsUpdated($event) {
    this.tagsUpdated.emit($event);
  }

  addTag() {
    console.log('adding');
  }
}
