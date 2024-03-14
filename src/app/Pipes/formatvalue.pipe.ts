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

    const url = this.route.snapshot.url

    let action =""
    if(url[2]){ //view
        action = url[2]?.path
    }

    
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
        //   console.log(obj)
  
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

    if(name == 'carImages') {
       
        let obj = value
      
        if(action=="view"){
            console.log(obj)
            newValue = []
            obj.forEach((element:any) => {
                const url = new TextDecoder("utf-8").decode(new Uint8Array(element.image.data));
                newValue.push(`<img src='${url}' width='50'>`)
            });
        }
        else {
            if(obj[0]) {
                const url = new TextDecoder("utf-8").decode(new Uint8Array(obj[0]?.image?.data));
                newValue= `<img src='${url}' width='50'>`
            }
        }
        
    }
   

    return newValue;
  }

}
