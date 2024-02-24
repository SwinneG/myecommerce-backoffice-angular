import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatvalue'
})
export class FormatvaluePipe implements PipeTransform {

  transform(value: any, args: Array<any>): unknown {

    let newValue = value
    let name = args[0]
    let data = args[1]

    if(name == 'picture') {
        // console.log(value)
        const url = value
        newValue = `<img src='${url}' width='50' height='50'>`
    }
    if(name == 'price') {
        const currency = '€';
        newValue = value + currency
    }

    return newValue;
  }

}
