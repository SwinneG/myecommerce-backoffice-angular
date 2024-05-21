import { Pipe, PipeTransform } from '@angular/core';

enum Type {
    INPUT = "INPUT",
    SELECT_FOREIGN = 'SELECT_FOREIGN',
    IMAGE = "IMAGE",
    HIDDEN_FOREIGN = 'HIDDEN_FOREIGN',
    CHECKBOX = "CHECKBOX"
}

@Pipe({
  name: 'formatType'
})

export class FormatTypePipe implements PipeTransform {

  transform(name: any, data: any): unknown {
    
    let type = Type.INPUT

    if(name === 'image' || name == 'carImages') {
      type = Type.IMAGE
    }

    if(name === 'fuelId' || name === "extcolorId" || name === "intcolorId" || name === "transmissionId" || name === "brandId" || name === "modelId" || name === "stateId" || name === "chassisId" ){
        type = Type.HIDDEN_FOREIGN
    }
    
    if(name === "fuel" || name === "extcolor" || name === "intcolor" || name === "transmission" || name === "brand" || name === "model" || name === "state" || name === "chassis" ) {
        type = Type.SELECT_FOREIGN
    }

    if(name === "equipments") {
        type = Type.CHECKBOX
    }
    
    return type;
  }

}
