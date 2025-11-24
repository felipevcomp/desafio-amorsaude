import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SpecialtiesModalComponent} from "./modals/specialties-modal.component";



/**
 *
 */
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

