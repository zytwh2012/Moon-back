import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit {
  public posts = [];

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getPost()
        .subscribe(data => this.posts = data);
  }
  ngAfterViewInit() {

    window.onscroll = _ => {
      if (window.scrollY / window.innerHeight > 0.8) {
        this._postService.getPost()
        .subscribe(data => this.posts = data);
      }
    };
  }
}
