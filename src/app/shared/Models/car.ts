import { Brands } from "./brand"
import { CarImages } from "./car-image"
import { Chassis } from "./chassis"
import { Equipments } from "./equipment"
import { EquipmentCategories } from "./equipment-category"
import { ExtColors } from "./ext-color"
import { Fuel } from "./fuel"
import { IntColors } from "./int-color"
import { Models } from "./model"
import { States } from "./state"
import { Transmissions } from "./transmission"
import { User } from "./user"

export class Car {
    name: string = ""
    power: number = 0
    nb_horses: number = 0
    nb_kms: number = 0
    first_registration_date: string = ""
    nb_seating_places: number = 0
    nb_doors: number = 0
    co2: number = 0
    regular_price: number = 0
    currency: string = ""
    fuelId: number = 1
    fuel: Fuel = {
        name: "",
        createdAt: '',
        updatedAt: ''
    }
    extcolorId: number = 1
    extcolor: ExtColors = {
        name: "",
        type: "",
        createdAt: '',
        updatedAt: ''
    }
    intcolorId: number = 1
    intcolor: IntColors = {
        name: "",
        createdAt:'',
        updatedAt: ''
    }
    transmissionId: number = 1
    transmission: Transmissions = {
        name: "",
        createdAt: '',
        updatedAt:''
    }
    brandId: number = 1
    brand: Brands = {
        name: "",
        createdAt: '',
        updatedAt:  ''
    }
    modelId: number = 1
    model: Models = {
        name: "",
        brand: new Brands(),
        createdAt:  '',
        updatedAt:  ''
    }
    stateId: number = 1
    state: States = {
        name: "",
        createdAt: '',
        updatedAt:  ''
    }
    chassisId: number = 1
    chassis: Chassis = {
        name: "",
        createdAt: '',
        updatedAt: ''
    }
    // equipmentId: number = 1
    // equipment: Equipments = {
    //     name: "",
    //     equipmentCategoryId: 1,
    //     equipmentCategory: new EquipmentCategories(),
    //     createdAt: '',
    //     updatedAt: ''
    // }
    // equipmentCategoryId: number = 1
    // equipmentCategory : EquipmentCategories = {
    //     name: "",
    //     createdAt: "",
    //     updatedAt: ""
    // }
    carImages: Array<CarImages> =  []
    userId: number = 1
    user: User ={
        name: "",
        createdAt:  '',
        updatedAt:  ''
    }
    equipments: Array<Equipments> =  []
    createdAt: string = ''
    updatedAt: string = ''
}
