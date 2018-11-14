import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit {
  public posts = [];
  private _is_pullable = true;
  private _current_path = '/';

  constructor(private _postService: PostService, private _location: Location, private _router: Router) { }
  ngOnInit() {

    this._current_path = this._router.url.toString();
    this._current_path = this._current_path.substr(1, this._current_path.length );
    this._postService.getPost(this._current_path, this.posts.length)
    .subscribe(data => this.posts = data);
  }

  ngAfterViewInit() {
    window.onscroll = _ => {
      if ( this._is_pullable && ( window.scrollY + window.innerHeight) / document.body.scrollHeight >= 0.95) {
        console.log(this.posts.length, 'before');
        this._postService.getPost(this._current_path, this.posts.length)
        .subscribe(data => {
            if (data.length > 0) {
              this.posts = this.posts.concat(data);
            } else {
              this._is_pullable = false;
            }
          });

        console.log(this.posts.length, 'after');

      }
    };
  }
}


