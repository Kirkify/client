import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, guid } from '@datorama/akita';
import { QuestionInterface } from '../models/question.interface';
import { SectionInterface } from '../models/section.interface';

export interface FormCreatorState extends EntityState<QuestionInterface>, ActiveState {
  filter: string;
  sections: SectionInterface[];
}

function createInitialState(): FormCreatorState {
  return {
    filter: '',
    active: null,
    sections: [],
  };
}

@Injectable()
export class FormCreatorStore extends EntityStore<FormCreatorState> {
  constructor() {
    super(createInitialState(), {
      name: `FormCreator-${guid()}`
    });
  }
}
