import { compileDeclareNgModuleFromMetadata, compileNgModule } from '@angular/compiler';
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

    constructor(
        private fb: FormBuilder,
        private entityService: EntityService
    ) {}

    ngOnInit() {

        //FIELS WE DON'T MANAGE
        this.entityNames = this.entityNames.filter((name: string) => {
            if(name === 'created' || name === 'user' || name === 'userId') {
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
                    data = await lastValueFrom(this.entityService.getDatas(name,"", 1, -1))
                }
                else if(name == "equipmentCategory") {
                    data = await lastValueFrom(this.entityService.getDatas("equipmentCategories","",1,-1))
                }
                else if(name == 'image' || name == 'carImages'){
                    data = await lastValueFrom(this.entityService.getDatas("carImages","",1,-1))
                }
                else {
                    data = await lastValueFrom(this.entityService.getDatas(name+"s","", 1, -1))
                }

                //value of associated (id) field for selected option
                let associatedFieldValue = this.data[name + 'Id']
                
                let results = data.results.rows

                this.objects.push({name, objects: results, associatedFieldValue})
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
        if(this.files) {
            data["files"] = this.files
        }
        this.formEmit.emit({...data})
    }

    handleChangeObject(event: any) {
        const {name, value} = event.target

        console.log({name, value} )
        
        //change value of associated (id) field
        let associatedField = name+'Id'
        console.log(associatedField)
        if(associatedField) {
            const el = document.querySelector('#'+associatedField) as HTMLInputElement;
            if(el) {
                el.value = value;
            }
        }
    }

    handleChangeFile(files: any) {
        this.files = files
    }

}
