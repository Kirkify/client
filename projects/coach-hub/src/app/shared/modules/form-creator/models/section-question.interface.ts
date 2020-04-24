import { SectionInterface } from './section.interface';
import { QuestionInterface } from './question.interface';

export interface SectionQuestionInterface {
  sections: SectionInterface[];
  questions: QuestionInterface[];
}
