import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'm2h'
})
export class MinutesToHours implements PipeTransform {
  transform(value: string): string {
    const intValue = parseFloat(value);
     if(intValue > 0 && intValue/60 < 1) {
       return intValue + ' Minutes';

     } else {
       return Math.floor(intValue/60) + ' Hour(s) ' + intValue%60 + ' Minutes';
     }
  }
}