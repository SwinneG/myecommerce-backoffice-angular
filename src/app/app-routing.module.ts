import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './Components/main/main.component';
import { Error404Component } from './Components/error404/error404.component';
import { DataManagerComponent } from './Components/data-manager/data-manager.component';

const routes: Routes = [
    {
        path: "",
        component: MainComponent
    },
    {
        path: "cars",
        component: MainComponent
    },
    {
        path: "fuels",
        component: MainComponent
    },
    {
        path: "extcolors",
        component: MainComponent
    },
    {
        path: "intcolors",
        component: MainComponent
    },
    {
        path: "transmissions",
        component: MainComponent
    },
    {
        path: "brands",
        component: MainComponent
    },
    {
        path: "models",
        component: MainComponent
    },
    {
        path: "states",
        component: MainComponent
    },
    {
        path: "chassis",
        component: MainComponent
    },
    {
        path: "equipments",
        component: MainComponent
    },
    {
        path: "equipmentCategories",
        component: MainComponent
    },
    {
        path: "carImages",
        component: MainComponent
    },
    {
        path: ":entity/:id/:action",
        component: DataManagerComponent
    },
    {
        path: ":entity/:action",
        component: DataManagerComponent
    },
    {
        path: "**",
        component: Error404Component
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
