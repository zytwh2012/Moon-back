import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req, next) {
    const tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + this.getToken())
      }
    );
    return next.handle(tokenizedReq);
  }


  getToken() {
    if (sessionStorage.getItem('accessToken')) {
      return sessionStorage.getItem('accessToken');
    } else if (localStorage.getItem('accessToken')) {
      return localStorage.getItem('accessToken');
    } else {
      return null;
    }
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken') || !!sessionStorage.getItem('accessToken');
  }
}


