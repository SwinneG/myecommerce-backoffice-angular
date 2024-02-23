import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTag'
})
export class FormatTagPipe implements PipeTransform {

  transform(value: any, tag: string): unknown {

    let newValue = value

    if(tag) {
        let newTag: any = tag
        // Remplace toutes les occurrences de newTag (insensible à la casse) par <strong>newTag</strong>
        newValue = value.replace(new RegExp(newTag, 'gi'), (match:any) => `<strong>${match}</strong>`)
    }

    return newValue

  }

}
