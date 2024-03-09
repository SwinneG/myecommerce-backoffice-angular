import { Pipe, PipeTransform } from '@angular/core';

enum Type {
    INPUT = "INPUT",
    // SELECT = "SELECT",
    // SELECT_CATEGORIES = "SELECT_CATEGORIES",
    // TEXT = "TEXT",
    SELECT_FOREIGN = 'SELECT_FOREIGN',
    IMAGE = "IMAGE",
    // OPTION = "OPTION"
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

    if(name === "pictures") {
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
    
    
    if(name === "fuel" || name === "extcolor" || name === "intcolor" || name === "transmission" || name === "brand" || name === "model" || name === "state" || name === "chassis" || name === "equipment" || name === "equipmentCategory") {
        type = Type.SELECT_FOREIGN
    }
    
    return type;
  }

}
