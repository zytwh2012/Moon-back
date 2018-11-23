import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private _post_url = 'http://localhost:3000/api/feed';

  constructor(private http: HttpClient, private _auth: TokenService) { }


  getPost(request, reqCount): Observable<Post[]> {
    const branchJson = {branch: request, count: reqCount};
    return this.http.post<Post[]>(this._post_url, branchJson)
                    .pipe(
                        tap( posts => {
                          console.log(posts,'post')
                          return posts;
                          }), catchError(
                              (error: any) => {
                                console.log(error,'error')
                                // this._auth.collectFailedRequest(request);
                                return throwError(error);
                              })
                    );
  }
}
