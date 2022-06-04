import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export default class LogoutService {
  constructor(private router: Router) {}

  logOut() {
    localStorage.clear();
    this.router.navigate(['/hello']);
  }
}
