import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import {Md5} from 'ts-md5/dist/md5';
import { TokenService } from '../../authentication/token.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  public content = '';
  public user_id = '';
  constructor(private _tokenserver: TokenService) { }
  postModel = new Post(null, null, null, null, null, null, null, null);

  ngOnInit() {
    // get user id
    this.user_id = localStorage.getItem('user_id');
    if (this.user_id === '') {
      this.user_id = sessionStorage.getItem('user_id');
    }
  }

  onSubmit() {
    const timestamp: number = Date.now() / 1000;
    this.postModel.postOwner_id = this.user_id;
    this.postModel.lastEdited = timestamp;
    this.postModel.id = Md5.hashStr('' + this.postModel.postOwner_id + timestamp);
    console.log(this.postModel);
  }
}
