import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private _post_url = 'http://localhost:3000/api/feed';

  constructor(private http: HttpClient) { }


  getPost(request, reqCount): Observable<Post[]> {
    const branchJson = {branch: request, count: reqCount};
    return this.http.post<Post[]>(this._post_url, branchJson)
                    .pipe(
                        map( posts => {
                          return posts;
                          }), catchError((error: any) => throwError(error)) 
                    );
  }
}
