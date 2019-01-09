import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PostDetailService } from './post-detail.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public postId: String;
  public post: String;
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
        console.log(data,'heello');
        if (data) {
          this.post = this.post;
          console.log(this.post);
        }
      },
      error => {
        console.log(error);
        // unable to find post, redirect to 404
        this.router.navigate(['404']);
      }
    );
    // present post detail
  }

}
