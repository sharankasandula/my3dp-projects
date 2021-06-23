import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTitle'
})
export class GetTitlePipe implements PipeTransform {

  transform(value: string): string {
    const regEx = new RegExp('(.*)by .*');
    try {
      return regEx.exec(value)[1];
    } catch (e) {
      return value;
    }
  }

}
