import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFormValue'
})
export class FormatFormValuePipe implements PipeTransform {

  transform(name: any, data: any): unknown {
    // console.log(data[name])
    let newValue = data[name]

    // if(typeof data[name] === 'object') {
    //     console.log(data[name].name)
    //     newValue = data[name].name
    // }

    return newValue;
  }

}
