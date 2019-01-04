import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  public content = '';
  constructor() { }
  postModel = new Post(null, null, null, null, null, null, null, null);

  ngOnInit() {
  }

}
