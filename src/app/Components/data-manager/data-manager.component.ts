import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { actions } from 'src/app/Helpers/actions';
import { getEntity, getEntityProperties } from 'src/app/Helpers/helpers';
import { routes } from 'src/app/Helpers/route';
import { formatToCamelCase } from 'src/app/Helpers/utils';
import { NotificationModel } from 'src/app/Models/notification-model';
import { EntityService } from 'src/app/Services/entity.service';
import { WebNotificationService } from 'src/app/Services/web-notification.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.scss']
})
export class DataManagerComponent implements OnDestroy{

    entity: any
    entityId: any
    pageName: any
    action: any
    entityNamesAll: any
    result: any
    data: any
    routes: Array<any> = routes
    actions: Array<string> = actions
    getDataById$ = new Subscription()

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entityService: EntityService,
        private notificationService: WebNotificationService
    ) {}

    ngOnInit() {
        window.scrollTo(0,0)
        const urls = this.route.snapshot.url
        if(urls.length < 2) {
            this.router.navigate(['/error'])
        }
        if(urls.length == 3){ //view, edit
            this.entity = urls[0]?.path 
            this.entityId = urls[1].path
            this.action = urls[2].path
        }
        if(urls.length == 2) { //add, delete
            this.entity = urls[0]?.path 
            this.action = urls[1].path
        }

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

        this.entityNamesAll = getEntityProperties(this.entity)

        if(['view', 'edit'].includes(this.action)) {
            this.getDatasById()
        }
        else if (this.action == 'add') {
            this.data = getEntity(this.entity)
        }
        
    }

    ngOnDestroy(): void {
        this.getDataById$.unsubscribe()
    }

    getDatasById() {
        this.getDataById$ = this.entityService.getDatasById(this.entity, this.entityId).subscribe({
            next: (value: any) => {
                this.result = value 
                this.data = value.data
            },
            error: (error: any) => {
                console.log(error)
            }
        })
    }

    getValue(name: any) {
        return this.data[name]
    }

    handleFormChange(data: any) {
        let formData: any = {}

        if(data?.files && data?.files.length !== 0) {  //upload new file
            const files = data.files
            delete data.files

            formData = new FormData()
            formData.append([this.entity], JSON.stringify(data))

            //ACTION 'ADD' OR 'UPDATE'
            files
                .filter((fileItem: any) => fileItem.action !== 'DELETE')
                .forEach((fileItem: any) => formData.append('file', fileItem.file))

            //ACTION 'DELETE'
            const deleteFiles = 
                files
                    .filter((fileItem: any) => (fileItem.action === 'DELETE') || (fileItem.action === 'UPDATE'))
                    .map((fileItem: any) => fileItem.oldImage)        
            formData.append('deleteFiles', JSON.stringify(deleteFiles))
            
        }
        else { //without upload
            const entity: any = this.entity
            formData[entity] = data
        }

        console.log([...formData]);

        //SAVE DATA
        if(formData) {
            if(this.action === 'edit'){
                this.entityService.updateData(this.entity, this.entityId, formData).subscribe({
                    next: (value: any) => {
                        console.log(value)
                        const message = "Update success"
                        const status = "success"
                        this.notificationService.emitNotification({message, status})
                    },
                    error: (error: any) => {
                        const message = "Update error"
                        const status = "danger"
                        this.notificationService.emitNotification({message, status})
                    }
                })
            }
            else if(this.action === 'add') {
                this.entityService.addData(this.entity, formData).subscribe({
                    next: (value: any) => {
                        const message = "Add success"
                        const status = "success"
                        this.notificationService.emitNotification({message, status})
                    },
                    error: (error: any) => {
                        const message = "Add error"
                        const status = "danger"
                        this.notificationService.emitNotification({message, status})
                    }
                })
            }
           
        }
    }
}
