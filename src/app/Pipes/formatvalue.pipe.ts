import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    const url = this.route.snapshot.url
    const imageUrlBase = environment.apiUrl

    let action =""
    if(url[2]){ //view
        action = url[2]?.path
    }
    
    if(name == 'fuel' || name == 'extcolor' || name == 'intcolor' || name == 'transmission' || name == 'brand' || name == 'model' || name == 'state' || name == 'chassis' || name == 'equipment' || name == 'equipmentCategory') {
        const obj = value;
        newValue = obj.name
    }

    if(name == 'user') {
        const obj = value;
        newValue = obj.username
    }

    if(name == 'image'){
        const obj = value
        newValue=`<img src='${imageUrlBase + obj}' width='50'>`
    }

    if(name == 'carImages') {
        let obj = value
        if(action=="view"){
            newValue = []
            obj.forEach((element:any) => {
                newValue.push(`<img src='${imageUrlBase + element.image}' width='50'>`)
            });
        }
        else {
            if(obj[0]) {
                newValue= `<img src='${imageUrlBase + obj[0]?.image}' width='50'>`
            }
        }
    }

    if(name == 'created') {
        let obj = value
        const formattedDate = obj.split('T')[0];
        newValue = formattedDate
    }

    return newValue;
  }

}
