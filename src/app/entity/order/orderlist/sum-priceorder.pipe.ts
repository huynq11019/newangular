import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sumPriceorder'
})
export class SumPriceorderPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): number {

    // console.log(value);
    let total = 0;
    value?.forEach(dt => {
      // console.log(dt?.price);
      total += dt?.price;
    });
    return total;
  }

}
