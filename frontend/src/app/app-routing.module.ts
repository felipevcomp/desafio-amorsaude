import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {ClinicFormComponent} from "./clinic/clinic-form/clinic-form.component";
import {ClinicListComponent} from "./clinic/clinic-list/clinic-list.component";
import {ClinicViewComponent} from "./clinic/clinic-view/clinic-view.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clinic',
    component: ClinicListComponent
  },
  {
    path: 'clinic/create',
    component: ClinicFormComponent
  },
  {
    path: 'clinic/edit/:id',
    component: ClinicFormComponent
  },
  {
    path: 'clinic/view/:id',
    component: ClinicViewComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
