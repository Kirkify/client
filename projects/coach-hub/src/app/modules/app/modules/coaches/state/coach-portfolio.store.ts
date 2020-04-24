import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CoachPortfolioInterface } from '../models/coach-portfolio.interface';

export interface CoachPortfolioState extends EntityState<CoachPortfolioInterface>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'coachPortfolio' })
export class CoachPortfolioStore extends EntityStore<CoachPortfolioState> {

  constructor() {
    super();
  }

}

