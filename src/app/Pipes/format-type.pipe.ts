import { Pipe, PipeTransform } from '@angular/core';

enum Type {
    INPUT = "INPUT",
    // SELECT = "SELECT",
    // SELECT_CATEGORIES = "SELECT_CATEGORIES",
    // TEXT = "TEXT",
    SELECT_FOREIGN = 'SELECT_FOREIGN',
    IMAGE = "IMAGE",
    // OPTION = "OPTION"
    HIDDEN_FOREIGN = 'HIDDEN_FOREIGN'
}

@Pipe({
  name: 'formatType'
})

export class FormatTypePipe implements PipeTransform {

  transform(name: any, data: any): unknown {
    
    let type = Type.INPUT

    //EXEMPLE SELECT:
    // let selectDatas = ['status','isBestSeller']
    // if(selectDatas.includes(name)) {
    //     type = Type.SELECT
    // }

    if(name === 'image' || name == 'carImages') {
      type = Type.IMAGE
    }

    //EXEMPLE OPTIONS:
    // if(name === "fuelId") {
    //     type = Type.OPTION
    // }

    //EXEMPLE CATEGORIES:
    // if(name === 'categories') {
    //     type = Type.SELECT_CATEGORIES
    // }  

    if(name === 'fuelId' || name === "extcolorId" || name === "intcolorId" || name === "transmissionId" || name === "brandId" || name === "modelId" || name === "stateId" || name === "chassisId" || name === "equipmentId" || name === "equipmentCategoryId"){
        type= Type.HIDDEN_FOREIGN
    }
    
    if(name === "fuel" || name === "extcolor" || name === "intcolor" || name === "transmission" || name === "brand" || name === "model" || name === "state" || name === "chassis" || name === "equipment" || name === "equipmentCategory") {
        type = Type.SELECT_FOREIGN
    }
    
    return type;
  }

}
