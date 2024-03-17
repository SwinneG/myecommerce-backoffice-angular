import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFormValue'
})
export class FormatFormValuePipe implements PipeTransform {

  transform(name: any, data: any): unknown {
    let newValue = data[name]

    return newValue;
  }

}
