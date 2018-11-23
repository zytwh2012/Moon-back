import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { tap , map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  // cachedRequests: Array<HttpRequest<any>> = [];

  // public collectFailedRequest(request): void {
  //     this.cachedRequests.push(request);
  // }

  // public retryFailedRequests(): void {
  //   // retry the requests. this method can
  //   // be called after the token is refreshed
  // }

  constructor(private injector: Injector, private http: HttpClient) {}
  intercept(req, next) {
    const tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + this.getToken())
      }
    );
    return next.handle(tokenizedReq).pipe(
      tap ((res) => {
          if (res) {
            console.log(res, 'res');
            return res;
          }} ,
          catchError(
            (error: any) => {
              // this._auth.collectFailedRequest(request);
              console.log(error, 'error');
              return throwError(error);
          })
    ));
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
    console.log('get token', token);
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

    return this.http.get<any>(_refreshUrl, { headers: _headers });
  }


}


