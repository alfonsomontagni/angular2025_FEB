import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refRelDatetime'
})
export class RefRelDatetimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
