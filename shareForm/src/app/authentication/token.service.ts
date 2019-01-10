import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { map, catchError, mergeMap} from 'rxjs/operators';
import { throwError, Observable, empty, from } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  public storage: Subject<any> = new Subject<any>();

  public publish(value: any) {
    this.storage.next(value);
  }

  constructor(private http: HttpClient, private router: Router) {}
  intercept(req, next) {
    const tokenResponse = /token/gi;
    if (req.url.search(tokenResponse) === -1 ) {
      let tokenizedReq = req.clone(
        {headers: req.headers.set('Authorization', 'bearer ' + this.getToken())});
      // get first try result
      return next.handle(tokenizedReq).pipe(
        map( res => {
          return res;
        }),
        catchError( (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 ) {
            // access token expired
            // send refresh token req
            return this.refreshToken().pipe(
              mergeMap( (res) => {
                if (res.status === 'successful') {
                  sessionStorage.setItem('accessToken', res.data.accessToken);
                }
                tokenizedReq = req.clone(
                  {
                    headers: req.headers.set('Authorization', 'bearer ' + this.getToken())
                  }
                );
                return next.handle(tokenizedReq);
              }),
              catchError( (err) => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login']);
                return throwError('refresh token failed');
              })
            );
          }
        }})
      );
    } else {

      const refreshToken = this.getFreshToken();
      const tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'bearer ' + refreshToken)
        }
      );

      return next.handle(tokenizedReq);
    }
  }


  getToken() {
    let token: any;
    if ( sessionStorage.getItem('accessToken')) {
      token =  sessionStorage.getItem('accessToken');
    }  else {
      token = null;
    }
    return token;
  }

  loggedIn() {
    return !!localStorage.getItem('refreshToken') || !!sessionStorage.getItem('refreshToken');
  }
  getFreshToken() {
    // find refresh token
    if (sessionStorage.getItem('refreshToken')) {
      return sessionStorage.getItem('refreshToken');
    } else if (localStorage.getItem('refreshToken')) {
      return localStorage.getItem('refreshToken');
    } else {
      return null;
    }
  }

  refreshToken() {

    const refreshUrl = 'http://localhost:3000/api/token';

    return this.http.get<any>(refreshUrl);
  }
}
