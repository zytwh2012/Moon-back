import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private _post_url = 'http://localhost:3000/api/feed';

  constructor(private http: HttpClient) { }

  getPost(request, reqCount): Observable<Post[]> {
    const branchJson = {branch: request, count: reqCount};
    return this.http.post<Post[]>(this._post_url, branchJson);
  }
}
