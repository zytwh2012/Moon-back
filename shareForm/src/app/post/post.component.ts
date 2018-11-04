import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public posts = []

  constructor(private _postService : PostService) { }

  ngOnInit() {
    this._postService.getPost()
        .subscribe(data => this.posts = data)
  }
  exports: [
    PostComponent
  ]
}
