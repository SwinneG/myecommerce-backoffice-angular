import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: string): string {
  
        let newValueArray: any = value.split('_')
        newValueArray = newValueArray.map((name: string) => {
            return name.charAt(0).toUpperCase()+name.slice(1)
        })
    
       let newValue = newValueArray.join(" ")
    
        switch(newValue) {
            case 'Extcolor':
                newValue = 'Exterior color';
                break;
            case 'Intcolor':
                newValue = 'Interior color';
                break;
            case 'CarImages':
                newValue = 'Car Images';
                break;
            case "CreatedAt":
                newValue = 'Created at';
                break;
            case "User":
                newValue = 'Created by';
                break;
            case "UpdatedAt":
                newValue = 'Updated at'
                break;
        }
        
        return newValue
  }

}
