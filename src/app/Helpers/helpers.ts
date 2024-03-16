import { Brands } from '../Models/brand';
import { Car } from '../Models/car';
import { Chassis } from '../Models/chassis';
import { Equipments } from '../Models/equipment';
import { EquipmentCategories } from '../Models/equipment-category';
import { ExtColors } from '../Models/ext-color';
import { Fuel } from '../Models/fuel'
import { IntColors } from '../Models/int-color';
import { Models } from '../Models/model';
import { States } from '../Models/state';
import { Transmissions } from '../Models/transmission';

export const getEntityProperties = (entity: string): Array<string> => {
    
    let results: any = []
    let entityClass: any

    if(entity == "cars" ) { 
        entityClass = new Car()
    }
    if(entity == "fuels") {
        entityClass = new Fuel()
    }
    if(entity == "extcolors") {
        entityClass = new ExtColors()
    }
    if(entity == "intcolors") {
        entityClass = new IntColors()
    }
    if(entity == "transmissions") {
        entityClass = new Transmissions()
    }
    if(entity == "brands") {
        entityClass = new Brands()
    }
    if(entity == "models") {
        entityClass = new Models()
    }
    if(entity == "states") {
        entityClass = new States()
    }
    if(entity == "chassis") {
        entityClass = new Chassis()
    }
    if(entity == "equipments") {
        entityClass = new Equipments()
    }
    if(entity == "equipmentCategories") {
        entityClass = new EquipmentCategories()
    }

    if(entityClass) {
        results = Object.keys(entityClass)
    }

    return results

}

export const getEntity = (entity: string): any => {
    let entityClass: any

    if(entity == "cars" ) { 
        entityClass = new Car()
    }
    if(entity == 'fuels') {
        entityClass = new Fuel()
    }
    if(entity == "extColors") {
        entityClass = new ExtColors()
    }
    if(entity == "intColors") {
        entityClass = new IntColors()
    }
    if(entity == "transmissions") {
        entityClass = new Transmissions()
    }
    if(entity == "brands") {
        entityClass = new Brands()
    }
    if(entity == "models") {
        entityClass = new Models()
    }
    if(entity == "states") {
        entityClass = new States()
    }
    if(entity == "chassis") {
        entityClass = new Chassis()
    }
    if(entity == "equipments") {
        entityClass = new Equipments()
    }
    if(entity == "equipmentCategories") {
        entityClass = new EquipmentCategories()
    }

    return entityClass
}

export const generateId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}
