import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderDisplay'
})
export class GenderDisplayPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'm':
        return 'Male';
      case 'f':
        return 'Female';
      case 'o':
        return 'Other';
    }
  }

}
