import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../../../state/authentication/models/user.interface';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform = (value: (Partial<UserInterface> | Partial<UserInterface>[]), args?: any) => {
    if (Array.isArray(value)) {
      let listOfNames = '';
      for (const user of value) {
        listOfNames += `${this._getFullName(user)}, `;
      }
      return listOfNames !== '' ? listOfNames.slice(0, -2) : listOfNames;
    } else {
      return this._getFullName(value);
    }
  }

  private _getFullName(user: Partial<UserInterface>): string {
    return `${user.first_name} ${user.last_name}`;
  }
}
