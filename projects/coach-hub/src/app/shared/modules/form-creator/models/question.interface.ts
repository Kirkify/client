import { QuestionTypeEnum } from './question-type.enum';
import { QuestionMetaInterface } from './question-meta.interface';

export interface QuestionInterface {
  id: string;
  sortId: number;
  sectionId: string;
  type: QuestionTypeEnum;
  meta: QuestionMetaInterface;
  question: string;
  description: string;
  hideDescription: boolean;
  required: boolean;
  sectionHeader?: boolean;
}
