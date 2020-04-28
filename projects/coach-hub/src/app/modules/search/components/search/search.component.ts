import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SearchQuery } from '../../state/search/search.query';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { switchMap, take } from 'rxjs/operators';
import { categoriesConstant } from '../../models/categories.constant';
import { CategoryType } from '../../models/category.type';
import { CoachProfileInterface } from '../../../app/models/coach-profile.interface';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'ch-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild('group') group: MatButtonToggleGroup;

  toggleOptions = categoriesConstant;
  selectedValue: Observable<CategoryType>;

  constructor(
    private service: SearchService,
    private query: SearchQuery
  ) {
    this.selectedValue = this.query.selectedCategory();
  }

  ngOnInit() {
  }

  selectionChanged(item) {
    this.service.updateSelectedCategory(item.value);
  }

}
