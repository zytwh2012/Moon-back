import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public posts = [];

  constructor(private _postService: PostService, private _location: Location) { }
  ngOnInit() {
    if (this._location.isCurrentPathEqualTo('/')) {
      this._postService.getPost()
      .subscribe(data => this.posts = data);
    } else if (this._location.isCurrentPathEqualTo('/game')) {
      this._postService.getBranchPost('game')
      .subscribe(data => this.posts = data);
    } else if (this._location.isCurrentPathEqualTo('/animate')) {
      this._postService.getBranchPost('animate')
      .subscribe(data => this.posts = data);
    } else if (this._location.isCurrentPathEqualTo('/novel')) {
      this._postService.getBranchPost('novel')
      .subscribe(data => this.posts = data);
    }
  }
}


