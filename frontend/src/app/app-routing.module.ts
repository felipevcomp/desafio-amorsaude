import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'clinic',
    loadChildren: () =>
      import('./clinic/clinic.module').then(m => m.ClinicModule),
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
