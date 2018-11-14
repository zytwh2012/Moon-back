import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private _post_url = 'http://localhost:3000/api/feed';
  private _post_branch_url = 'http://localhost:3000/api/branch_feed';

  constructor(private http: HttpClient) { }

  getBranchPost(request): Observable<Post[]> {
    let branchJson = {branch: request};
    return this.http.post<Post[]>(this._post_branch_url, branchJson);
  }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this._post_url);
  }
}
