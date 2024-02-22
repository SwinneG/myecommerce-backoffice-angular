import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEntityProperties } from 'src/app/Helpers/helpers';
import { EntityService } from 'src/app/Services/entity.service';
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'src/app/Helpers/route'
 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

    pagePath: string = ""
    pageName: string = ""
    pageNumber: number = 1
    pageLimit: number = 5
    datas: any
    result: any
    isLoading: boolean = true
    entityNames: Array<string> = []
    entityNamesAll: Array<string> = []
    routes: Array<any> = routes

    faEye = faEye
    faEdit = faEdit
    faTrash = faTrash
    faPlus = faPlus

    constructor(
        private route: ActivatedRoute,
        private entityService: EntityService
    ){}

    ngOnInit(){
        this.initComp()
        this.getDatasByPage()
    }

    initComp() {
         // console.log(this.route.snapshot)
         this.pagePath = this.route.snapshot.url[0]?.path || "cars";

         const routeObject: any = this.routes.filter(route => route.path === this.pagePath)
        //  console.log(routeObject)
         if(routeObject[0]) {
             this.pageName = routeObject[0]?.name
         }
         
        this.entityNamesAll = getEntityProperties(this.pagePath)
        // console.log(entityNamesAll)
        this.entityNames = [this.entityNamesAll[0]]
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
        console.log(this.pagePath, this.pageNumber, this.pageLimit)
        this.entityService.getDatasByPage(this.pagePath, this.pageNumber, this.pageLimit).subscribe({
            next: (data: any) => {
                // console.log(data)
                const {isSuccess, results} = data
                if(isSuccess && results) {
                    this.isLoading = false
                    this.datas = results?.rows
                    console.log(this.datas)
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
