import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GroupCategoryInterface } from '../../../../../../state/coach/models/group-category.interface';
import { CategoriesQuery } from '../../../../../../state/categories/categories.query';
import { CategoriesService } from '../../../../../../state/categories/categories.service';

@Component({
  selector: 'ch-group-displayer',
  templateUrl: './group-displayer.component.html',
  styleUrls: ['./group-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GroupDisplayerComponent implements OnInit {

  @Input() group: GroupCategoryInterface;

  activeIds$ = this.categoriesQuery.selectActiveId();

  constructor(
    private categoriesQuery: CategoriesQuery,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
  }

  chipClicked(id: number) {
    this.categoriesService.toggleActive(id);
    this.categoriesQuery.getActiveId();
    console.log(id);
  }
}
