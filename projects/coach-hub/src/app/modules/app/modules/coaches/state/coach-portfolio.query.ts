import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoachPortfolioState, CoachPortfolioStore } from './coach-portfolio.store';

@Injectable({
  providedIn: 'root'
})
export class CoachPortfolioQuery extends QueryEntity<CoachPortfolioState> {

  constructor(protected store: CoachPortfolioStore) {
    super(store);
  }

}
