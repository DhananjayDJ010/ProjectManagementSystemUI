import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/model/login';
import { Registration } from 'src/model/Registration';

@Injectable()
export default class RegistrationService {
  constructor(private http: HttpClient) {}
  signup(registrationRequest: Registration) {
    let signUpDetails = this.http.post(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/user/register',
      registrationRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Sign up response:');
    console.log(signUpDetails);
    return signUpDetails;
  }

  login(registrationRequest: Login) {
    let signInDetails = this.http.post(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/user/login',
      registrationRequest,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Sign in response:');
    console.log(signInDetails);
    return signInDetails;
  }
}
