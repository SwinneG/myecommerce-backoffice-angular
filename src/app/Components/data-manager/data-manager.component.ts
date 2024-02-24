import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actions } from 'src/app/Helpers/actions';
import { getEntityProperties } from 'src/app/Helpers/helpers';
import { routes } from 'src/app/Helpers/route';
import { formatToCamelCase } from 'src/app/Helpers/utils';
import { EntityService } from 'src/app/Services/entity.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.scss']
})
export class DataManagerComponent {

    entity: any
    entityId: any
    pageName: any
    action: any
    entityNamesAll: any
    result: any
    data: any
    routes: Array<any> = routes
    actions: Array<string> = actions

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entityService: EntityService
    ) {}

    ngOnInit() {
        window.scrollTo(0,0)
        // console.log(this.route.snapshot.url)
        const urls = this.route.snapshot.url
        if(urls.length < 3) {
            this.router.navigate(['/error'])
        }
        this.entity = urls[0]?.path 
        this.entityId = urls[1]?.path
        this.action = urls[2]?.path
        // console.log(this.entity, this.entityId, this.action)

        const isEntityExist = routes.filter(route => {
            return route.path === this.entity
           
        })
        if(!isEntityExist || !isEntityExist[0]) {
            this.router.navigate(['/error'])
        }
        if(!this.actions.includes(this.action)) {
            this.router.navigate(['/error'])
        }

        const routeObject: any = this.routes.filter(route => route.path === this.entity)
        if(routeObject[0]) {
            this.pageName = formatToCamelCase(this.action)+" "+routeObject[0]?.single
        }
        // console.log(this.entity, this.entityId, this.action)

        this.entityNamesAll = getEntityProperties(this.entity)

        this.getDatasById()
    }

    getDatasById() {
        this.entityService.getDatasById(this.entity, this.entityId).subscribe({
            next: (value: any) => {
                // console.log(value)
                this.result = value 
                this.data = value.data
                // console.log(this.data)
            },
            error: (error: any) => {
                console.log(error)
            }
        })
    }

    getValue(name: any) {
        // console.log(this.data)
        return this.data[name]
    }

    handleFormChange(data: any) {
        console.log(data)
    }
}
