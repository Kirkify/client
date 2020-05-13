import { Pipe, PipeTransform } from '@angular/core';
import { ID } from '@datorama/akita';

@Pipe({
  name: 'isCategoryIdActive'
})
export class IsCategoryIdActivePipe implements PipeTransform {

  transform(value: ID[], ...args: number[]): unknown {
    return value.includes(args[0]);
  }
}
