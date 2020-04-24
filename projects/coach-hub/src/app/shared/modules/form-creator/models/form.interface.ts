import { SectionQuestionInterface } from './section-question.interface';

export interface FormInterface {
  id: string;
  value: Stringified<SectionQuestionInterface>;
  created_at: string;
}
