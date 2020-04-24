import { FormCreatorQuery } from '../../../state/form-creator.query';
import { FormCreatorService } from '../../../services/form-creator.service';

export interface ReOrderDialogInterface {
  query: FormCreatorQuery;
  service: FormCreatorService;
}
