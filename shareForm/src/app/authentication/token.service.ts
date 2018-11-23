import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { tap , map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';



@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request): void {
      this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed

    this.cachedRequests.pop();
  }

  constructor(private injector: Injector,
              private http: HttpClient,
              private router: Router) {}
  intercept(req, next) {

    const tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + this.getToken())
      }
    );
    // get first try result
    let tempReturn = next.handle(tokenizedReq).pipe(
      tap ((res) => {
          if (res instanceof HttpResponse) {
            return res;
          } else {
          }
        }),
        catchError( error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 ) {
              // access token expired
              if (error.name === 'HttpErrorResponse') {
                // this.collectFailedRequest(req);
                // send refresh token req
                this.refreshToken();
              }
              return throwError(error);
            }
            // else not HttpErrorResponse
            return throwError(error);
          }}));
    return tempReturn;
  }


  getToken() {
    let token: any;
    if ( sessionStorage.getItem('accessToken')) {
      token =  sessionStorage.getItem('accessToken');
    } else if (sessionStorage.getItem('accessToken')) {
      token =  localStorage.getItem('accessToken');
    } else {
      token = null;
    }
    return token;
  }

  loggedIn() {
    return !!localStorage.getItem('refreshToken') || !!sessionStorage.getItem('refreshToken');
  }

  refreshToken() {
    let token: any;
    const _refreshUrl = 'http://localhost:3000/api/token';
    // find refresh token
    if (sessionStorage.getItem('refreshToken')) {
      token =  sessionStorage.getItem('refreshToken');
    } else if (localStorage.getItem('refreshToken')) {
      token =  localStorage.getItem('refreshToken');
    } else {
      token = null;
    }

    const _headers = new HttpHeaders({'Content-Type': 'application/json',
                                  'Authorization':  'bearer ' + token
                                });
    return this.http.get<any>(_refreshUrl).pipe(
      tap ((event) => {
          console.log('event1', event)
          if (event instanceof HttpResponse) {
            return event;
          } else {
          }
        }),
        catchError(( error => {
          console.log('event2', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 ) {
              // refresh token expired
              if (error.name === 'HttpErrorResponse') {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }
            }
          }
          // else not HttpErrorResponse
          return throwError(error);
          })));
        // .subscribe( data => {
        //   sessionStorage.setItem('accessToken', data.data.accessToken);
        // },
        // // error => console.log(error)
        // );
  }
}
