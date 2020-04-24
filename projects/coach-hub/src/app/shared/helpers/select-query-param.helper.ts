import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function selectParam(route: ActivatedRoute, paramId: string = 'id'): Observable<string> {
  return route.paramMap.pipe(
    map(params => {
      return params.get(paramId);
    })
  );
}
