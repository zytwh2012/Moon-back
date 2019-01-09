
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../post';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map, tap, retry} from 'rxjs/operators';
import { TokenService } from '../../authentication/token.service';


@Injectable({
  providedIn: 'root'
})

export class PostDetailService {

  private _post_url = 'http://localhost:3000/api/feed';

  constructor(private http: HttpClient, private _auth: TokenService) { }


  getPostById(postId): Observable<Post[]> {
    const postIdJson = {id: postId, count: 1};
    return this.http.post<Post[]>(this._post_url, postIdJson)
                    .pipe(
                      tap( post => {
                        return post; // only fetch root-post
                      }),
                      catchError(
                        (error: any) => {
                          // this._auth.collectFailedRequest(request);
                          return throwError(error);
                      })
                    );
  }
}
