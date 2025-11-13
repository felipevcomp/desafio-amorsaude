import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {ClinicFormComponent} from "./clinic/clinic-form/clinic-form.component";
import {ClinicListComponent} from "./clinic/clinic-list/clinic-list.component";

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SpecialtiesModalComponent} from "./modals/specialties-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ClinicFormComponent,
    ClinicListComponent,
    SpecialtiesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
