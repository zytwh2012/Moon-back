import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public postID: String;
  constructor(private router: Router,
              private location: Location) { }

  ngOnInit() {
    // get postID by chop and extract last component in url
    this.postID = this.location.path().split('/').pop();
    // get post detail json information from service

    // present post detail
  }

}
