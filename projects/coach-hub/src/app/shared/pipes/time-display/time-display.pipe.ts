import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeDisplay'
})
export class TimeDisplayPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      return moment.utc(value).format('MMM DD');
    }
    return '';
  }

}
