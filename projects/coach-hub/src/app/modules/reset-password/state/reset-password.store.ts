import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'reset-password' })
export class ResetPasswordStore extends Store<{}> {

  constructor() {
    super({});
  }

}

