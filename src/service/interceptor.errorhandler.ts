import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppHttpErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error or network error
        } else {
          if (error.status === 403 || error.status == 400) {
            // TODO: Permission denied; show toast
            console.log('Forbidden status');
            this.messageService.add({
              severity: 'error',
              summary: 'Unauthorized',
              detail: 'Token Expired. Please login again',
            });
            this.router.navigate(['hello']);
          }
        }
        return throwError(error);
      })
    );
  }
}
