import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: string): string {

    let newValueArray: any = value.split('_')
    newValueArray = newValueArray.map((name: string) => name.charAt(0).toUpperCase()+name.slice(1))
    
    let newValue = newValueArray.join(" ")
    return newValue
  }

}
