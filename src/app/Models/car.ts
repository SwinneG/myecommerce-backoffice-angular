import { Brands } from "./brand"
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
    //id: number = 0
    name: string = ""
    pictures: string = ""
    power: number = 0
    nb_horses: number = 0
    nb_kms: number = 0
    first_registration_date: string = ""
    nb_seating_places: number = 0
    nb_doors: number = 0
    co2: number = 0
    regular_price: number = 0
    currency: string = ""
    created: string = ""
    //fuelId: number = 0
    fuel: Fuel = {
        name: ""
    }
    //extcolorId: number = 0
    extcolor: ExtColors = {
        name: "",
        type: ""
    }
    //intcolorId: number = 0
    intcolor: IntColors = {
        name: ""
    }
    //transmissionId: number = 0
    transmission: Transmissions = {
        name: ""
    }
    //brandId: number = 0
    brand: Brands = {
        name: "",
        created: ""
    }
    //modelId: number = 0
    model: Models = {
        name: "",
        brand: new Brands()
    }
    //stateId: number = 0
    state: States = {
        name: ""
    }
    // chassisId: number = 0
    chassis: Chassis = {
        name: ""
    }
    // equipmentId: number = 0
    equipment: Equipments = {
        name: "",
        equipmentCategory: new EquipmentCategories()
    }
    //equipmentCategoryId: number = 0
    equipmentCategory : EquipmentCategories = {
        name: "",
        created: ""
    }
    //userId: number = 0
    user: User ={
        name: ""
    }
}
