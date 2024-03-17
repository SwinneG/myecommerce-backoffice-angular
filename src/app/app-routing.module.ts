import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice/backoffice.component'
import { FrontendComponent } from './frontend/frontend.component';

const routes: Routes = [
    { path: 'admin', component: BackofficeComponent },
    { path: '', component: FrontendComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
