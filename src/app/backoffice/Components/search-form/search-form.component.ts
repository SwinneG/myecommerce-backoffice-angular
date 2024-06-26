import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

    @Input() name:  any = "name"
    @Output() newValue = new EventEmitter<any>()

    value: string=""

    constructor() {}

    handleSubmit(event:any) {
        event.preventDefault()
        if(this.value) {
            const data: any = {name: this.name, value: this.value}
            this.newValue.emit(data)
        }
        else {
            this.newValue.emit(null)
        }
    }

}
