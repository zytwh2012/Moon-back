import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map, tap, retry} from 'rxjs/operators';
import { TokenService } from '../authentication/token.service';


@Injectable({
  providedIn: 'root'
})

export class PostService {

  private postUrl = 'http://localhost:3000/api/feed';

  constructor(private http: HttpClient, private _auth: TokenService) { }


  getPost(request, reqCount): Observable<Post[]> {

    const branchJson = {branch: request, count: reqCount};
    console.log(branchJson);
    return this.http.post<Post[]>(this.postUrl, branchJson)
                    .pipe(
                      tap( posts => {
                        return posts;
                      }),
                      catchError(
                        (error: any) => {
                          // this._auth.collectFailedRequest(request);
                          return throwError(error);
                      })
                    );
  }
}
