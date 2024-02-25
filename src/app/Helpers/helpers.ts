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

export const getEntity = (entity: string): any => {
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

    return entityClass
}

export const generateId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}
