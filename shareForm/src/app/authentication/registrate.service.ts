import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrareService {
  private _registerUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) { }

  signUpRequest(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
}
