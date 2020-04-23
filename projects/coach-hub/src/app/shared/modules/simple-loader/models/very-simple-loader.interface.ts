import { Observable } from 'rxjs';

export interface VerySimpleLoaderInterface {
  loader?: Observable<boolean>;
  cancellable?: boolean;
  message?: string;
  loading?: boolean;
  hasBackground?: boolean;
}
