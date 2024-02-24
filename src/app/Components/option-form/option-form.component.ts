import { Component, Input } from '@angular/core';
import { generateId } from 'src/app/Helpers/helpers';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent {

    @Input() options: any = []

    constructor() {}

    ngOnInit() {
        this.options = this.options ? this.options : []
        console.log(this.options)
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

}
