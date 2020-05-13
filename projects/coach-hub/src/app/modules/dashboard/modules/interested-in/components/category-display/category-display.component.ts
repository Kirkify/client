import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CategoryInterface } from '../../../../../../state/categories/models/category.interface';
import { CategoriesQuery } from '../../../../../../state/categories/categories.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'ch-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategoryDisplayComponent implements OnInit {

  @Input() categoryId: number;
  @Input() isActive = true;
  @Output() chipClicked = new EventEmitter<number>();

  category$: Observable<CategoryInterface>;

  constructor(
    private query: CategoriesQuery
  ) { }

  ngOnInit(): void {
    this.category$ = this.query.selectEntity(this.categoryId);
  }
}
