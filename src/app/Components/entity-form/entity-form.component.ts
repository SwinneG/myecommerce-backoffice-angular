import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { EntityService } from 'src/app/Services/entity.service';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent {

    @Input() entityNames: Array<string> = []
    @Input() data: any
    @Input() formType: any
    @Input() entity: any

    @Output() formEmit = new EventEmitter<any>()

    form: any;
    formData: any = {}
    files: any
    objects: any
    objectSelected: any

    constructor(
        private fb: FormBuilder,
        private entityService: EntityService
    ) {}

    ngOnInit() {

        //FIELS WE DON'T MANAGE
        this.entityNames = this.entityNames.filter((name: string) => {
            if(name === 'created' || name === 'user') {
                return false
            }
            return true
        })

        //DATA WITH OBJECT TYPE
        this.objects = []
        this.entityNames.forEach(async (name: any) => {
            const value = this.data[name]
            if(typeof value ==="object") {
                let data: any;
                if(name == 'chassis'){
                    data = await lastValueFrom(this.entityService.getDatas(name,""))
                }
                else if(name == "equipmentCategory") {
                    data = await lastValueFrom(this.entityService.getDatas("equipmentCategories",""))
                }
                else {
                    data = await lastValueFrom(this.entityService.getDatas(name+"s",""))
                }

                this.objectSelected = this.data[name+"Id"]
                
                let results = data.results.rows
                this.objects.push({name, objects: results})
            }
        })
        
        this.initForm()

    }

    initForm() {
        let formObject = {}
        this.entityNames.forEach((name: any) => {
            const value = this.data[name]
            formObject = {...formObject, [name]: this.fb.control(value, [Validators.required])}
        })
        this.form = this.fb.group(formObject)
    }

    handleSubmit() {
        const data = {...this.form.value, ...this.formData}
        // console.log(this.files)
        if(this.files) {
            data['files'] = this.files
        }
        this.formEmit.emit({...data})
    }

    handleChangeObject(event: any) {
        const {name, value} = event.target
    }

    handleChangeFile(files: any) {
        this.files = files
    }

}
