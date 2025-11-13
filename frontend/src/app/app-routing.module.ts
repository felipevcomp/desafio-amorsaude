import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {ClinicFormComponent} from "./clinic/clinic-form/clinic-form.component";
import {ClinicListComponent} from "./clinic/clinic-list/clinic-list.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'clinic/create',
    component: ClinicFormComponent
  },
  {path: 'clinic/edit/:id', component: ClinicFormComponent},
  {path: 'clinic', component: ClinicListComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
