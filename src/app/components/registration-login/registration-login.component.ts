import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/model/Registration';
import RegistrationService from 'src/service/registration.service';

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.css']
})
export class RegistrationLoginComponent implements OnInit {

  stateOptions: any[];
  userRoles: any[] = [{name: 'Manager', key: 'MANAGER'}, {name: 'User', key: 'USER'}];
  userState!: string;
  userDetails: Registration = new Registration();
  loginUserDetails: Registration = new Registration();

  constructor(private registration:RegistrationService) { 
    this.stateOptions = [{label: 'Sign Up', value: 'SIGN_UP'}, {label: 'Log In', value: 'LOGIN'}];
  }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.userDetails);
    this.registration.signup(this.userDetails).subscribe(response => {
      console.log(response);
    })
  }

  login(){
    console.log(this.loginUserDetails);
    this.registration.login(this.userDetails).subscribe(response => {
      console.log(response);
      let token = response.headers.get("token");
      console.log(token);
    })
  }
}
