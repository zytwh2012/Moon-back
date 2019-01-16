import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  private newPostUrl = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) { }

  newPostRequest(data) {
    return this.http.post<any>(this.newPostUrl, data);
  }
}
