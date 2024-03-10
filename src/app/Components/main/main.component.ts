import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEntityProperties } from 'src/app/Helpers/helpers';
import { EntityService } from 'src/app/Services/entity.service';
import { faEye, faEdit, faTrash, faPlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'src/app/Helpers/route'
import { Subscription, forkJoin, lastValueFrom, map, mergeMap } from 'rxjs';
 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy{

    entity: string = ""
    pageName: string = ""
    pageNumber: number = 1
    pageLimit: number = 5
    datas: any
    result: any
    isLoading: boolean = true
    entityNames: Array<string> = []
    entityNamesAll: Array<string> = []
    routes: Array<any> = routes
    query: string = ""
    searchTag: string = ""
    displaySelectionBox: boolean = false
    // pictures: any|null = null
    entityDelete: any
    isDeleting: boolean = false
    modalTitle: string = ""
    modalContent: string = ""
    group: Array<string> = []

    getDatas$ = new Subscription()

    faEye = faEye
    faEdit = faEdit
    faTrash = faTrash
    faPlus = faPlus
    faLayerGroup = faLayerGroup

    constructor(
        private route: ActivatedRoute,
        private entityService: EntityService
    ){}

    ngOnInit(){
        this.initComp()
        this.getDatas()
    }

    ngOnDestroy(): void {
        this.getDatas$.unsubscribe()
    }

    initComp() {
         this.entity = this.route.snapshot.url[0]?.path;

         const routeObject: any = this.routes.filter(route => route.path === this.entity)
         if(routeObject[0]) {
             this.pageName = routeObject[0]?.name
         }
         
        this.entityNamesAll = getEntityProperties(this.entity)
        const localData = this.getLocalData(this.entity)
        this.entityNames = localData ? localData ?.entityNames : [this.entityNamesAll[0]]
    }

    getValue(data: any, name: string) {
        const index:any = name
        return data[index]
    }

    setPage(page:number) {
        this.pageNumber = page
        this.getDatas()
    }

    setPageLimit(event: any) {
        const {value} = event.target
        const pageLimit = parseInt(value)
        if(!isNaN(pageLimit)){
            this.pageLimit = parseInt(value)
            this.getDatas()
        }
    }

    getDatas() {
        this.getDatas$ = this.entityService.getDatas(this.entity, this.searchTag, this.pageNumber, this.pageLimit).subscribe({
            next: (data: any) => {
                const {isSuccess, results} = data
                if(isSuccess && results) {
                    this.isLoading = false
                   
                    //when not available in API:
                   /* if(this.entity === "cars") {
                        this.datas = results?.rows

                        //Fuels request
                        const uniqueFuelIds = [...new Set(this.datas.map((car: any) => car.fuelId))];
                        uniqueFuelIds.forEach((id: any) => {
                            this.entityService.getDatasById('fuels', id).subscribe((fuel:any) => {
                                fuel = fuel.data
                                this.datas.filter((car:any) => car.fuelId === id).forEach((car:any) => car.fuel = fuel.name);
                            });
                        });

                        this.result = data
                    }*/

                  /* if(this.entity === 'cars') {
                        this.datas = results?.rows

                        console.log(this.datas)


                        this.result = data
                        // console.log(this.result)
                    }
                    else {*/
                        this.datas = results?.rows
                        this.result = data
                        // console.log(this.datas)
                    /*}*/
                } 
            },
            error: (error: any) => {
                console.log(error)
            }
        })
    }

    searchData(data: any) {
        this.query = ""
        if(data) {
            this.searchTag = data.value
            this.query += data.name+"="+data.value
        }
        this.getDatas()
    }

    setDisplaySelectionBox() {
        this.displaySelectionBox = !this.displaySelectionBox
    }

    setEntityNames(event: any, name: string) {
        const {checked} = event.target

        if(checked) {
            if(!this.entityNames.includes(name)) {
                const oldValue = this.entityNames
                oldValue.push(name)
                this.entityNames = []
                this.entityNames = this.entityNamesAll.filter(name => oldValue.includes(name))
            }
        }
        else {
            this.entityNames = this.entityNames.filter((entityName: string) => entityName !== name)
        }

        const index: any = this.entity
        let data: any = {"entityNames": this.entityNames}

        this.saveLocalData(index, data)
    }

   /* setImageView(name: any, data: any) {

        if(!name && !data) {
            this.pictures = null
        }

        if(name === "pictures") {
            this.pictures = data['pictures']

            let picturesArray = this.pictures?.split(';')
            if(picturesArray){
                this.pictures = picturesArray
            }
        }
        else {
            this.pictures = null
        }
        
    }
*/
    saveLocalData(key: string, value: string) {
        if(window.localStorage) {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    }

    getLocalData(key: string): any {
        if(window.localStorage) {
            const value: any = window.localStorage.getItem(key)
            return JSON.parse(value)
        }
    }

    handleDelete(data: any) {
        const index: any = this.entityNames[0]
        if(data){
            const name = data[index]
            this.isDeleting = true
            this.entityDelete = data
            this.modalTitle = "Confirm delete"
            this.modalContent = `<p>Do you want to delete this ${this.entity} : ${name} ?</p>`
        }
        else {
            //group
            if(this.group.length) {
                this.isDeleting = true
                this.entityDelete = data
                this.modalTitle = "Confirm Delete"
                this.modalContent = `<p>Do you want to delete ${this.group.length} item(s) : ?</p>`
                this.modalContent += '<ul>'
                this.group.forEach((id: any) => {
                    const item = this.datas.filter((data:any) => data.id === id)[0]
                    const name = item[index]
                    this.modalContent += `<li>${name}</li>`
                })
                this.modalContent += '</ul>'
            }
        }
        
    }

    handleCloseModal(event: any) {
        this.isDeleting = false
        this.entityDelete = null
        this.modalTitle = ""
        this.modalContent = ""
    }

    async handleConfirmModal(event: any) {

        if(this.entityDelete) {
            this.entityService.deleteData(this.entity, this.entityDelete.id).subscribe({
                next: (value: any)  => {
                    this.getDatas()
                },
                error: (error: any) => {
                    console.log(error)
                }
            })
        }
        else {
            if(this.group.length) {
                // this.group.forEach(async (id: any) => {
                //     const result = await lastValueFrom(this.entityService.deleteData(this.entity, id))
                //     console.log(result)
                // })
                // => boucle pas super performant donc on fait une promesse asynchrone:
                await Promise.all(this.group.map(async (id: any) => {
                    await lastValueFrom(this.entityService.deleteData(this.entity, id))
                }))
                this.group = []
                this.getDatas()
            }
        }

        this.isDeleting = false
        this.entityDelete = null

    }

    handleGroup(event: any, id: string) {
        const { checked } = event.target

        if(checked) {
            //checked
            if(!this.group.includes(id)) {
                this.group.push(id)
            }
        }
        else {
            //unchecked
            this.group = this.group.filter((item: string) => item !== id)
        }
    }

    groupAll(event: any) {
        const { checked } = event.target

        if(checked) {
            //checked
            this.group = this.datas.map((data:any) => data.id)
        }
        else {
            //unchecked
            this.group = []
        }
    }
}
