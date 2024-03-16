import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTag'
})
export class FormatTagPipe implements PipeTransform {

  transform(value: any, tag: string): unknown {

    let newValue = value

    if(tag) {
        if(isNaN(newValue)) {
            let newTag: any = tag
            newValue = value.replace(new RegExp(newTag, 'gi'), (match:any) => `<strong>${match}</strong>`)
        }
        else {
            let newTag: any = tag
            newValue = value.toString().replace(new RegExp(newTag, 'gi'), (match:any) => `<strong>${match}</strong>`)
        }
        
       
    }

    return newValue

  }

}
