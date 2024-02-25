import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MenuComponent } from './Components/menu/menu.component';
import { Error404Component } from './Components/error404/error404.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { MainComponent } from './Components/main/main.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { SearchFormComponent } from './Components/search-form/search-form.component';
import { ImagePreviewComponent } from './Components/image-preview/image-preview.component';
import { DataManagerComponent } from './Components/data-manager/data-manager.component';
import { EntityFormComponent } from './Components/entity-form/entity-form.component';

import { FormatNamePipe } from './Pipes/format-name.pipe';
import { FormatTagPipe } from './Pipes/format-tag.pipe';
import { FormatvaluePipe } from './Pipes/formatvalue.pipe';
import { FormatFormValuePipe } from './Pipes/format-form-value.pipe';
import { FormatTypePipe } from './Pipes/format-type.pipe';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { OptionFormComponent } from './Components/option-form/option-form.component';
import { WebNotificationComponent } from './Components/web-notification/web-notification.component';
import { ModalComponent } from './Components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
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
    FormatNamePipe,
    FormatTagPipe,
    FormatvaluePipe,
    FormatFormValuePipe,
    FormatTypePipe,
    ImageViewComponent,
    OptionFormComponent,
    WebNotificationComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
