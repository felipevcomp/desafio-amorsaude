import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SpecialtiesModalComponent} from "./modals/specialties-modal.component";

import {httpInterceptorProviders} from './_helpers/http.interceptor';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpecialtiesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskDirective,
  ],
  providers: [httpInterceptorProviders, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule {
}

