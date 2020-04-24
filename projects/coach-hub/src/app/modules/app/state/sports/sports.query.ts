import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SportsStore, SportsState } from './sports.store';
import { SportInterface } from '../../models/sport.interface';

@Injectable({
  providedIn: 'root'
})
export class SportsQuery extends QueryEntity<SportsState, SportInterface> {

  constructor(protected store: SportsStore) {
    super(store);
  }

}
