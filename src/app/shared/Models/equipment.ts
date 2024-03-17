import { EquipmentCategories } from "./equipment-category"

export class Equipments {
    name: string = "" 
    equipmentCategoryId: number = 1
    equipmentCategory: EquipmentCategories = {
        name: "",
        createdAt:  '',
        updatedAt:  ''
    }
    createdAt: string = ''
    updatedAt: string = ''
}
