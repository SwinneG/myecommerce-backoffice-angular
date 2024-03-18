import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackofficeModule } from './backoffice/backoffice.module';
import { FrontendModule } from './frontend/frontend.module'

import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    BackofficeModule,
    FrontendModule,
    AppRoutingModule, //warning: MUST be after back et front module for correct routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
