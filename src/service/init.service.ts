import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export default class InitService {
  constructor(private http: HttpClient) {}
  registerHello() {
    let hello = this.http.get(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/registration/hello',
      {
        observe: 'response',
      }
    );
    console.log(hello);
    return hello;
  }

  userHello() {
    let hello = this.http.get(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/user/hello',
      {
        observe: 'response',
      }
    );
    console.log(hello);
    return hello;
  }

  projectHello() {
    let hello = this.http.get(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/project/hello',
      {
        observe: 'response',
      }
    );
    console.log(hello);
    return hello;
  }
}
