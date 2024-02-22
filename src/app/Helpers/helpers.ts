import { Car } from '../Models/car';

export const getEntityProperties = (entity: string): Array<string> => {
    
    let results: any = []
    let entityClass: any

    if(entity == "cars" ) { 
        entityClass = new Car()
    }
    // if(entity == "users") {
    //     entityClass = new User()
    // }
    // if(entity == "orders") {
    //     entityClass = new Order()
    // }
    // if(entity == "contacts") {
    //     entityClass = new Contact()
    // }

    if(entityClass) {
        results = Object.keys(entityClass)
    }

    return results

}