import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ref001RelDatetime'
})
export class Ref001RelDatetimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
