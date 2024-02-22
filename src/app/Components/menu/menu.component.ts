import { Component } from '@angular/core';
import { routes } from 'src/app/Helpers/route'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    routes: Array<any> = routes

    constructor(){}

}
