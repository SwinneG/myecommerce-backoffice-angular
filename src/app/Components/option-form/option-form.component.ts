import { Component, EventEmitter, Input, Output } from '@angular/core';
import { generateId } from 'src/app/Helpers/helpers';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent {

    @Input() options: any;

    @Output() emitOption = new EventEmitter<any>()

    constructor() {}

    ngOnInit() {
        this.options = this.options ? this.options : []
        // console.log(this.options)
    }

    addOption() {
        //NE FONCTIONNE PAS CAR DANS L'EX C'EST UN TABLEAU VIDE MAIS NOUS ON A UN NOMBRE 1
        this.options.push({
            id: generateId(),
            name: "Option Name",
            values: [
                {
                    id: generateId(),
                    value: 'Option value'
                }
            ]
        })
    }

    addOptionValue(optionId: string) {
        this.options = this.options.map((option: any) => {
            if(option.id === optionId) {
                this.options.values.push({
                    id: generateId(),
                    value: "Option value"
                })
            }
            return option
        })
    }

    removeOption(optionId: string) {
        this.options = this.options.filter((option: any) => option.id !== optionId)
    }

    removeOptionValue(optionId: string, valueId: string) {
        this.options = this.options.map((option: any) => {
            if(option.id === optionId) {
                option.values = option.values.filter((item: any) => item.id !== valueId)
            }
            return option
        })
        this.emitOption.emit(this.options)
    }

    updateOption(event: any, optionId: string) {
        const {value} = event.target
        this.options = this.options.map((option: any) => {
            if(option.id === optionId) {
                option.name = value
            }
            return option
        })
        // console.log(this.options)
        this.emitOption.emit(this.options)
    }

    updateOptionValue(event: any, optionId: string, valueId: string) {
        const {value} = event.target
        this.options = this.options.map((option: any) => {
            if(option.id === optionId) {
                option.values = option.values.map((valueItem: any) => {
                    if(valueItem.id === valueId) {
                        valueItem.name = value
                    }
                    return valueItem
                })
            }
            return option
        })
        // console.log(this.options)
        this.emitOption.emit(this.options)
    }

}
