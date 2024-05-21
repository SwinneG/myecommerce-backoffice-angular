import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { EntityService } from 'src/app/shared/Services/entity.service';

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
    @Output() dataChanged = new EventEmitter<any>()

    form: any;
    formData: any = {}
    files: any
    objects: any
    checkboxGroup: any

    constructor(
        private fb: FormBuilder,
        private entityService: EntityService
    ) {}

    async ngOnInit() {

        //FIELS WE DON'T MANAGE IN ADD/EDIT FORM
        this.entityNames = this.entityNames.filter((name: string) => {
            if(name === 'createdAt' || name === 'updatedAt' || name === 'user' || name === 'userId') {
                return false
            }
            return true
        })

        //GET DATAS WITH OBJECT TYPE
        const dataPromises = this.entityNames.map(async (name: any) => {
            if(typeof this.data[name] === "object") {
               
                if(name == 'chassis' || name == 'equipments'){
                    return lastValueFrom(this.entityService.getDatas(name,"", 1, -1))
                }
                else if(name == "equipmentCategory") {
                    return lastValueFrom(this.entityService.getDatas("equipmentCategories","",1,-1))
                }
                else if(name == 'image' || name == 'carImages'){
                    return  lastValueFrom(this.entityService.getDatas("carImages","",1,-1))
                }
                else {
                    return lastValueFrom(this.entityService.getDatas(name+"s","", 1, -1))
                }
                
            }
            else {
                return Promise.resolve(null)
            }
        })
        
        const resultsPromises = await Promise.all(dataPromises);
        this.objects = [] // todo: rename to personnalizationElements

        resultsPromises.forEach((result:any , index) => {
            if (result && result !== null) {
                const name = this.entityNames[index];
                let results = result.results.rows

               if(name=='equipments'){//for checkboxes
                    const associatedFieldValues:any = []
                    results.map((result:any) => {
                        if(result.cars.length !== 0) {
                            associatedFieldValues.push(result.id)
                        }
                    })
                    this.objects.push({ name, objects: results, associated: associatedFieldValues});
                }
                else{
                    const associatedFieldValue = this.data[name + 'Id'];
                    this.objects.push({ name, objects: results, associated: associatedFieldValue }); 
                }
               
            }
        });


        this.initForm()

    }

    initForm() {
        let formObject = {}
        this.entityNames.forEach((name: any) => {
            const value = this.data[name]

            formObject = {
                ...formObject, 
                [name]: this.fb.control(value, [Validators.required])
            }  
        })
        this.form = this.fb.group(formObject)

        //change value of selects/checkboxes with the good option(s)
        this.objects.forEach((object:any) => {
            if (this.form.get(object.name)) {
                if(object.name=="equipments"){//for checkboxes
                 
                }
                else {//for selects
                    this.form.get(object.name).setValue(object.associated);
                }
            }
        });
        
    }

    handleChangeObject(event: any) {
        const {id, value} = event.target

        if(event.target.classList.length > 0){
            event.target.classList.forEach((el:any) => {
                // console.log(el)
                if(el === 'form-select'){
                    //change value of associated (id) field
                    const associatedField = id+'Id'
                    if(associatedField) {
                        this.data[associatedField] = Number(value); 
                    }
                
                    //update form
                    if(this.form.get(associatedField)){
                        this.form.get(associatedField).setValue(Number(value))
                    }
                }
                if(el === 'form-check-input'){
                    const idEquipment = Number(event.srcElement.id.split('|').slice(-1))
                    // console.log(idEquipment)
                    // console.log(this.data['equipments'])
                    this.data['equipments'].push(idEquipment)
                }
            });
        }

       
       
    }

    handleChangeFile(files: any) {
        this.files = files
    }

    handleSubmit() {
        const data = {...this.form.value, ...this.formData}
        if(this.files) {
            data["files"] = this.files
        }
        this.formEmit.emit({...data})
    }

}
