import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent {

    @Input() entityNames: Array<string> = [];
    @Input() data: any;

    @Output() formEmit = new EventEmitter<any>();

    form: any;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // console.log(this.entityNames)
        // console.log(this.data)

        //EXEMPLE: champs qu'on ne gère pas nous meme
        // this.entityNames = this.entityNames.filter((name: string) => {
        //     if(name === 'created-at') {
        //         return false
        //     }
        //     return true
        // })

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

    handleSubmit() {
        // console.log(this.form.value)
        this.formEmit.emit({type: 'NORMAL', form: this.form.value})
    }

}
