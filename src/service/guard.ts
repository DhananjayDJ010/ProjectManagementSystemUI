import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  RoutesRecognized,
} from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  canActivateCheck = true;
  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;
    console.log(url);
    const token = localStorage.getItem('JWT');
    if (token !== undefined && token !== null && url.includes('/hello')) {
      this.canActivateCheck = false;
    }
    return this.canActivateCheck;
  }
}
