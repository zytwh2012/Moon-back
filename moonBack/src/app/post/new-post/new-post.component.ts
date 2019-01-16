import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {Md5} from 'ts-md5/dist/md5';
import {TokenService} from '../../authentication/token.service';
import {NewPostService} from './new-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  public content = '';
  public userId = '';
  constructor(private tokenServer: TokenService, private newPostService: NewPostService, private router: Router) { }
  postModel = new Post(null, null, null, null, null, null, null, null);

  ngOnInit() {
    // get user id
    this.userId = localStorage.getItem('userId');
    if (this.userId === '') {
      this.userId = sessionStorage.getItem('userId');
    }
  }

  onSubmit() {
    const timestamp: number = Date.now() / 1000;
    this.postModel.postOwnerId = this.userId;
    this.postModel.lastEdited = timestamp;
    this.postModel.branch = this.postModel.branch.toLowerCase();
    this.postModel.id = Md5.hashStr('' + this.postModel.postOwnerId + timestamp);
    console.log(this.postModel);

    this.newPostService.newPostRequest(this.postModel)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error, 'onSubmit() error');
        }
      );

      this.router.navigate(['/']);
  }
}
