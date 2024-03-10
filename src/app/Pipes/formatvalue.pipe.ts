import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'formatvalue'
})
export class FormatvaluePipe implements PipeTransform {

    constructor(
        private route: ActivatedRoute
    ) {}

   /* detectMimeType(buffer: Uint8Array): string | undefined {
        const uintArray = new Uint8Array(buffer.slice(0, 4));
        let header = '';
    
        for (let i = 0; i < uintArray.length; i++) {
          header += uintArray[i].toString(16);
        }

        console.log(header)
    
        switch (header) {
          case '89504e47':
            return 'image/png';
          case '47494638':
            return 'image/gif';
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
            return 'image/jpeg';
          default:
            return undefined;
        }
      }*/

  transform(value: any, args: Array<any>): unknown {

    let newValue = value
    let name = args[0]
    // console.log(name)
    // console.log(newValue)

    // console.log(name)
    // console.log(value)
    // let data = args[1]

    const url = this.route.snapshot.url
    // const firstPath = url[0].path
    // console.log(url[0].path)

    // let action =""
    // if(url[2]){ //view
    //     action = url[2]?.path
    // }

   /* if(name == 'pictures') {
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
        
    }*/
    
    if(name == 'fuel' || name == 'extcolor' || name == 'intcolor' || name == 'transmission' || name == 'brand' || name == 'model' || name == 'state' || name == 'chassis' || name == 'equipment' || name == 'equipmentCategory') {
        const obj = value;
        // console.log(obj)
        newValue = obj.name
    }
    if(name == 'user') {
        const obj = value;
        newValue = obj.username
    }
    if(name == 'image'){
          const obj = value
          // console.log(obj)
  
          // const buffer = new Uint8Array(obj.data);
          // console.log(buffer)
          // const mimeType = this.detectMimeType(buffer) || 'application/octet-stream';
          // const blob = new Blob([buffer], { type: mimeType || 'image/*'});
          // console.log(blob)
          // const img = URL.createObjectURL(blob);
          // console.log(img)
          
          // Supposons que `data` est votre tableau d'octets ou buffer
          const url = new TextDecoder("utf-8").decode(new Uint8Array(obj.data));
          // console.log(url); // Affiche l'URL sous forme de chaîne
  
          newValue=`<img src='${url}' width='50'>`
    }
   

    return newValue;
  }

}
