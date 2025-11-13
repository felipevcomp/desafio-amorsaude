import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ClinicFormComponent} from "./clinic/clinic-form/clinic-form.component";
import {ClinicListComponent} from "./clinic/clinic-list/clinic-list.component";
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SpecialtiesModalComponent} from "./modals/specialties-modal.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ClinicViewComponent} from "./clinic/clinic-view/clinic-view.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClinicFormComponent,
    ClinicListComponent,
    SpecialtiesModalComponent,
    ClinicViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskDirective,
    NgSelectModule
  ],
  providers: [httpInterceptorProviders, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
