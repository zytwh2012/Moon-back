import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { TokenService} from '../authentication/token.service';

import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit {
  public posts = [];
  private _is_pullable = true;
  private _current_path = '/';
  private _logedin;
  private _user_name = 'test';

  constructor(private _postService: PostService,
              private _location: Location,
              private _router: Router,
              private _tokenService: TokenService) { }
  ngOnInit() {
    this._current_path = this._router.url.toString();

    this._current_path = this._current_path.substr(1, this._current_path.length );
    this._postService.getPost(this._current_path, this.posts.length)
    .subscribe(data => this.posts = data, error => console.log(error) ); // need to send refresh token instead
    this._logedin = this._tokenService.loggedIn();
    console.log(this._logedin);
  }

  ngAfterViewInit() {
    window.onscroll = _ => {
      if ( this._is_pullable && ( window.scrollY + window.innerHeight) / document.body.scrollHeight >= 0.95) {
        this._postService.getPost(this._current_path, this.posts.length)
        .subscribe(
            data => {
              if (data.length > 0) {
                this.posts = this.posts.concat(data);
              } else {
                this._is_pullable = false;
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    };
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

}



