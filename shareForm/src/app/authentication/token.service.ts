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
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token');
    } else if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }


  // loggedIn() {
  //   return !!localStorage.getItem('token') && !!sessionStorage.getItem('token');
  // }
}


