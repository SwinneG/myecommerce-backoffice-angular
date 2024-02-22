import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: string): string {
    let newValue = value.charAt(0).toUpperCase()+value.slice(1)
    return newValue
  }

}
