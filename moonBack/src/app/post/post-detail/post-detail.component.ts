import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PostDetailService } from './post-detail.service';
import {Comment} from '../comment';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, AfterViewInit {

  public postId: String;
  public post = null;
  public comments = Array<Comment>();
  public isReply = false;
  public replyContent = '';
  // isPullable is to tack if more comments exits
  private isPullable: Boolean;

  constructor(private router: Router,
              private location: Location,
              private postDetailService: PostDetailService) { }

  ngOnInit() {
    // get postId by chop and extract last component in url
    this.postId = this.location.path().split('/').pop();
    // get post detail json information from service
    this.postDetailService.getPostById(this.postId).subscribe(
      data => {
        if (data) {
          this.post = data;
        } else {
          // unable to find post, redirect to 404
          this.router.navigate(['404']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  ngAfterViewInit() {
    // present post-detail
  }
  redirectByBranch() {
    this.router.navigate([this.post.branch.toLowerCase()]);
  }
  addPostComment(event, parentId) {
    let userId = localStorage.getItem('userId');
    if (userId === '') {
      userId = sessionStorage.getItem('userId');
    }
    const newComment = {
      root: this.postId,
      commentOwnerId: userId,
      commentContent: null,
      lastEdited: Date.now(),
      children: [],
      parent: parentId
    };
    // let replyTextArea = document.createElement('textarea');
    // event.target.appendChild();
    let clickTarget = null;
    if (event.target.tagName === 'SPAN') {
      clickTarget = event.target.parentNode;
    } else if (event.target.tagName === 'BUTTON') {
      clickTarget = event.target;
    }
    if (clickTarget != null) {
      // if click reply button
      const clickTargetParent = clickTarget.parentNode;
    }
    newComment.lastEdited = Date.now();
    // var postComment = new Comment(null, null, null, null, null, null, null, null);
    // postComment.root = this.post;

    // add post comment
  }
  submitComment(event, parentId) {
    this.isReply = false;
  }
}
