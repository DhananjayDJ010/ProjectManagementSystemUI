import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/model/Registration';
import { Router } from '@angular/router';
import RegistrationService from 'src/service/registration.service';
import { MessageService } from 'primeng/api';
import { Login } from 'src/model/login';

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.css'],
})
export class RegistrationLoginComponent implements OnInit {
  stateOptions: any[];
  userRoles: any[] = [
    { name: 'Manager', key: 'MANAGER' },
    { name: 'User', key: 'USER' },
  ];
  userState!: string;
  userDetails: Registration = new Registration();
  loginUserDetails: Login = new Login();

  constructor(
    private registration: RegistrationService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.stateOptions = [
      { label: 'Sign Up', value: 'SIGN_UP' },
      { label: 'Log In', value: 'LOGIN' },
    ];
  }

  ngOnInit(): void {}

  checkSignUp(userdetails: Registration|Login) {
    let ret = false;
    Object.values(userdetails).forEach((value: string) => {
      if (value === '') {
        ret = true;
      }
    });
    return ret;
  }

  signup() {
    console.log(this.userDetails);
    this.registration.signup(this.userDetails).subscribe(
      (response) => {
        console.log(response);
        this.loginUserDetails = { ...this.userDetails };
        this.login();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'User already exists',
        });
      }
    );
  }

  login() {
    console.log(this.loginUserDetails);
    this.registration.login(this.loginUserDetails).subscribe(
      (response) => {
        console.log(response);
        let token: any = response.headers.get('token');
        localStorage.setItem('JWT', token);
        console.log(token);
        let responseBody: any = response.body;
        localStorage.setItem('loggedInEmailId', responseBody.emailId);
        localStorage.setItem('loggedInUserRole', responseBody.userRole);
        localStorage.setItem('loggedInUserId', responseBody.userId);
        localStorage.setItem(
          'loggedInProjectRoles',
          JSON.stringify(responseBody.projectRoles)
        );
        this.router.navigate(['home']);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Unauthorized',
        });
      }
    );
  }
}
