import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SelectButtonModule} from 'primeng/selectbutton';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { FormsModule } from '@angular/forms';
import RegistrationService from 'src/service/registration.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectButtonModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    HttpClientModule
  ],
  providers: [
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
