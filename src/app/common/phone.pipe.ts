import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let phoneNumber= value as string;
    console.log('in Pipe !');
    return phoneNumber.replace(/(.{2})/g, '$1 ').trim()
  }

}
