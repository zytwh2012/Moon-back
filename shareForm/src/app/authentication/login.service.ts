import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _registerUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  loginInRequest(user) {
    console.log('haotianzhu');
    return this.http.post<any>(this._registerUrl, user);
  }
}
