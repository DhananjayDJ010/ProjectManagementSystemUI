import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';

const routes: Routes = [
  {'path': 'hello', component: RegistrationLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
