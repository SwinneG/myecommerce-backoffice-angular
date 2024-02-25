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
    categories: any
    categoriesSelected: any
    files: any

    constructor(
        private fb: FormBuilder,
        private entityService: EntityService
    ) {}

    async ngOnInit() {
        // console.log(this.entityNames)
        // console.log(this.data)

        //EXEMPLE: champs qu'on ne gère pas nous meme
        // this.entityNames = this.entityNames.filter((name: string) => {
        //     if(name === 'created-at') {
        //         return false
        //     }
        //     return true
        // })

        // EXEMPLE: categories
        if(this.entityNames.includes("categories")) {
            const data: any = await lastValueFrom(this.entityService.getDatas("category"))
            this.categoriesSelected = this.data["categories"]
            this.categories = data.results
        }
        // console.log({categories: this.categories})

        this.initForm()
    }

    initForm() {
        let formObject = {}
        this.entityNames.forEach((name: any) => {
            // console.log(name)
            // console.log(this.data)
            const value = this.data[name]
            // console.log(value)
            formObject = {...formObject, [name]: this.fb.control(value, [Validators.required])}
        })
        // console.log({formObject})
        this.form = this.fb.group(formObject)
    }

    initSelect() {
        const WD: any = window;
        const $ = WD.query;
        const self = this;

        $(document).ready(function() {
            $('.select-categories').select2()
            $('.select-categories').on('select2:select', function(event: any){
                const values = $('.select-categories').select2('val')
                // console.log(values)
                self.formData["categories"] = values
            })
            $('.select-categories').on('select2:unselect', function(event: any){
                const values = $('.select-categories').select2('val')
                self.formData['categories'] = values
            })

            $('.single-select').select2()
            $('single-select').on('select2:select', function(event: any){
                const {name, value} = event.target;
                // console.log({name, value})
                self.formData[name] = value
            })
        })
    }

    handleSubmit() {
        // console.log(this.form.value)
        // console.log(this.formData)
        const data = {...this.form.value, ...this.formData}
        if(this.files) {
            data['files'] = this.files
        }
        this.formEmit.emit({...data})
    }

    handleUpdateOption(data: any){
        console.log(data)
        this.formData['options'] = data
        console.log(this.formData)
    }

    handleChangeCategory(event: any) {
        const {name, value} = event.target
        console.log({name, value})
    }

    handleChangeFile(files: any) {
        this.files = files
    }

}
