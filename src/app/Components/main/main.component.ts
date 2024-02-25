import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEntityProperties } from 'src/app/Helpers/helpers';
import { EntityService } from 'src/app/Services/entity.service';
import { faEye, faEdit, faTrash, faPlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'src/app/Helpers/route'
import { Subscription, lastValueFrom } from 'rxjs';
 
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
    picture: string|null = null
    entityDelete: any
    isDeleting: boolean = false
    modalTitle: string = ""
    modalContent: string = ""
    group: Array<string> = []

    searchDatasByPage$ = new Subscription()
    getDatasByPage$ = new Subscription()

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
        this.getDatasByPage()
    }

    ngOnDestroy(): void {
        this.searchDatasByPage$.unsubscribe()
        this.getDatasByPage$.unsubscribe()
    }

    initComp() {
         // console.log(this.route.snapshot)
         this.entity = this.route.snapshot.url[0]?.path || "cars";

         const routeObject: any = this.routes.filter(route => route.path === this.entity)
        //  console.log(routeObject)
         if(routeObject[0]) {
             this.pageName = routeObject[0]?.name
         }
         
        this.entityNamesAll = getEntityProperties(this.entity)
        // console.log(entityNamesAll)
        const localData = this.getLocalData(this.entity)
        // console.log({localData})
        this.entityNames = localData ? localData ?.entityNames : [this.entityNamesAll[0]]
        // console.log(this.entityNames)
    }

    getValue(data: any, name: string) {
        const index:any = name
        return data[index]
    }

    setPage(page:number) {
        // console.log({setPage: page})
        this.pageNumber = page
        this.getDatasByPage()
    }

    setPageLimit(event: any) {
        // console.log(event.target)
        const {value} = event.target
        // console.log(value)
        const pageLimit = parseInt(value)
        // console.log(pageLimit)
        if(!isNaN(pageLimit)){
            this.pageLimit = parseInt(value)
            // console.log(this.pageLimit)
            this.getDatasByPage()
        }

    }

    getDatasByPage() {
        if(this.searchTag) {
            this.searchDatasByPage$ = this.entityService.searchDatasByPage(this.entity, this.searchTag, this.pageNumber, this.pageLimit).subscribe({
                next: (data: any) => {
                    // console.log(data)
                    const {isSuccess, results} = data
                    if(isSuccess && results) {
                        this.isLoading = false
                        this.datas = results?.rows
                        // console.log(this.datas)
                        this.result = data
                        // console.log(this.result)
                    } 
                },
                error: (error: any) => {
                    console.log(error)
                }
            })
        }
        else {
            // console.log(this.pagePath, this.pageNumber, this.pageLimit)
            this.getDatasByPage$ = this.entityService.getDatasByPage(this.entity, this.pageNumber, this.pageLimit).subscribe({
                next: (data: any) => {
                    // console.log(data)
                    const {isSuccess, results} = data
                    if(isSuccess && results) {
                        this.isLoading = false
                        this.datas = results?.rows
                        // console.log(this.datas)
                        this.result = data
                        // console.log(this.result)
                    } 
                },
                error: (error: any) => {
                    console.log(error)
                }
            })
        }
       
    }

    searchData(data: any) {
        this.query = ""
        if(data) {
            this.searchTag = data.value
            // console.log(this.searchTag)
            this.query += data.name+"="+data.value
            // console.log(this.query)
        }
       this.getDatasByPage()
    }

    setDisplaySelectionBox() {
        this.displaySelectionBox = !this.displaySelectionBox
    }

    setEntityNames(event: any, name: string) {
        const {checked} = event.target
        // console.log({checked, name})

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

    setImageView(name: any, data: any) {
        // console.log(name)

        if(!name && !data) {
            this.picture = null
        }

        if(name === "picture") {
            this.picture = data['picture']
        }
        else {
            this.picture = null
        }
        // console.log(this.picture)
    }

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
                    console.log(value)
                    this.getDatasByPage()
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
                this.getDatasByPage()
            }
        }
        

        this.isDeleting = false
        this.entityDelete = null

    }

    handleGroup(event: any, id: string) {
        const { checked } = event.target

        if(checked) {
            //coché
            if(!this.group.includes(id)) {
                this.group.push(id)
            }
        }
        else {
            //décoché
            this.group = this.group.filter((item: string) => item !== id)
        }

        console.log({checked, id})
    }

    groupAll(event: any) {
        const { checked } = event.target

        if(checked) {
            //coché
            this.group = this.datas.map((data:any) => data.id)
        }
        else {
            //décoché
            this.group = []
        }

        console.log(this.group)
    }
}
