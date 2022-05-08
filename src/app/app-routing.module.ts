import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';

const routes: Routes = [
  {'path': 'hello', component: RegistrationLoginComponent},
  {'path': 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
