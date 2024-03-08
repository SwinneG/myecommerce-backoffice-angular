import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTag'
})
export class FormatTagPipe implements PipeTransform {

  transform(value: any, tag: string): unknown {

    let newValue = value

    if(tag) {
        if(isNaN(newValue)) {
            let stringValue = newValue
           
            if(!stringValue.startsWith('http')) {
                let newTag: any = tag
                // Replace all occurrences of newTag (case insensitive) by <strong>newTag</strong>
                newValue = value.replace(new RegExp(newTag, 'gi'), (match:any) => `<strong>${match}</strong>`)
            }
        }
        else {
            let newTag: any = tag
            newValue = value.toString().replace(new RegExp(newTag, 'gi'), (match:any) => `<strong>${match}</strong>`)
        }
        
       
    }

    return newValue

  }

}
