import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('login') ||
      req.url.includes('register') ||
      localStorage.getItem('JWT') == null ||
      req.url.includes('search') ||
      req.url.includes('bye')
    ) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('JWT'),
      },
    });
    return next.handle(req);
  }
}
