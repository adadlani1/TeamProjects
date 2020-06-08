import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {error} from 'util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('access_token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + idToken)
      });
      return next.handle(cloned).pipe(tap(() => {
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            } else {
              this.router.navigate(['401']);
            }
          }
        }));
    } else {
      return next.handle(req);
      }
    }
  }
