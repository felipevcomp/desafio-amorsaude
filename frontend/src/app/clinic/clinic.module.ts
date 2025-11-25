import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgSelectModule} from "@ng-select/ng-select";

import {authGuard} from '@/app/_guards/auth.guard';

import {ClinicFormComponent} from './clinic-form/clinic-form.component';
import {ClinicListComponent} from './clinic-list/clinic-list.component';
import {ClinicViewComponent} from './clinic-view/clinic-view.component';
import {NgxMaskDirective} from "ngx-mask";



const routes: Routes = [
  {path: '', component: ClinicListComponent, canActivate: [authGuard]},
  {path: 'create', component: ClinicFormComponent, canActivate: [authGuard]},
  {path: 'edit/:id', component: ClinicFormComponent, canActivate: [authGuard]},
  {path: 'view/:id', component: ClinicViewComponent, canActivate: [authGuard]},
];

/**
 *
 */
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
    NgSelectModule,
    NgxMaskDirective
  ]
})
export class ClinicModule {
}
