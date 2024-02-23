import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MenuComponent } from './Components/menu/menu.component';
import { Error404Component } from './Components/error404/error404.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { MainComponent } from './Components/main/main.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { SearchFormComponent } from './Components/search-form/search-form.component';

import { FormatNamePipe } from './Pipes/format-name.pipe';
import { FormatTagPipe } from './Pipes/format-tag.pipe';

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
    FormatNamePipe,
    FormatTagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
