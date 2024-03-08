import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'formatvalue'
})
export class FormatvaluePipe implements PipeTransform {

    constructor(
        private route: ActivatedRoute
    ) {}

  transform(value: any, args: Array<any>): unknown {

    let newValue = value
    let name = args[0]
    // let data = args[1]

    const url = this.route.snapshot.url
    let action =""
    if(url[2]){ //view
        action = url[2]?.path
    }

    if(name == 'pictures') {
        const urlsArray = value.split(';');
       
        if(action=="view"){
            const newArray = urlsArray.map((item: string) => {
                return `<div class="col-md-4"><img src='${item}' width='100%'></div>`
            }).join('')
            newValue = `<div class="row">`
            newValue += newArray
            newValue += `</div>`
        }
        else {
            newValue = `<img src='${urlsArray[0]}' width='100%'>`
        }
        
    }
    
    if(name == 'fuel' || name == 'extcolor' || name == 'intcolor' || name == 'transmission' || name == 'brand' || name == 'model' || name == 'state' || name == 'chassis' || name == 'equipment' || name == 'equipmentCategory') {
        const obj = value;
        newValue = obj.name
    }
    if(name == 'user') {
        const obj = value;
        newValue = obj.username
    }

    return newValue;
  }

}
