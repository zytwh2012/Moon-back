import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from './post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _post_url =  '/assets//post.json';

  constructor(private http: HttpClient) { }

  getPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this._post_url);
  }

}
