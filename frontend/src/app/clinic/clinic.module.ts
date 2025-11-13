import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {ClinicListComponent} from './clinic-list/clinic-list.component';
import {ClinicFormComponent} from './clinic-form/clinic-form.component';
import {ClinicViewComponent} from './clinic-view/clinic-view.component';
import {authGuard} from '../guards/auth.guard';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
  {path: '', component: ClinicListComponent, canActivate: [authGuard]},
  {path: 'create', component: ClinicFormComponent, canActivate: [authGuard]},
  {path: 'edit/:id', component: ClinicFormComponent, canActivate: [authGuard]},
  {path: 'view/:id', component: ClinicViewComponent, canActivate: [authGuard]},
];

@NgModule({
  declarations: [
    ClinicListComponent,
    ClinicFormComponent,
    ClinicViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ]
})
export class ClinicModule {
}
