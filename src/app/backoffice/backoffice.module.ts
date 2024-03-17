import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MenuComponent } from './Components/menu/menu.component';
import { Error404Component } from '../shared/Components/error404/error404.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { MainComponent } from './Components/main/main.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { SearchFormComponent } from './Components/search-form/search-form.component';
import { ImagePreviewComponent } from './Components/image-preview/image-preview.component';
import { DataManagerComponent } from './Components/data-manager/data-manager.component';
import { EntityFormComponent } from './Components/entity-form/entity-form.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { OptionFormComponent } from './Components/option-form/option-form.component';
import { WebNotificationComponent } from './Components/web-notification/web-notification.component';
import { ModalComponent } from './Components/modal/modal.component';

import { FormatNamePipe } from './Pipes/format-name.pipe';
import { FormatTagPipe } from './Pipes/format-search-tag.pipe';
import { FormatvaluePipe } from './Pipes/formatvalue.pipe';
import { FormatFormValuePipe } from './Pipes/format-form-value.pipe';
import { FormatTypePipe } from './Pipes/format-type.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
    { path: 'admin', component: BackofficeComponent, children: [
        { 
            path: '',   
            redirectTo: 'cars', 
            pathMatch: 'full' 
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
            path: ":entity/:id/:action",
            component: DataManagerComponent
        },
        {
            path: ":entity/:action",
            component: DataManagerComponent
        },
    ]},
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    Error404Component,
    LoadingComponent,
    MainComponent,
    PaginationComponent,
    SearchFormComponent,
    ImagePreviewComponent,
    DataManagerComponent,
    EntityFormComponent,
    ImageViewComponent,
    OptionFormComponent,
    WebNotificationComponent,
    ModalComponent,
    FormatNamePipe,
    FormatTagPipe,
    FormatvaluePipe,
    FormatFormValuePipe,
    FormatTypePipe,
    BackofficeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class BackofficeModule { }