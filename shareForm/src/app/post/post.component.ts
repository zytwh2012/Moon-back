import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { TokenService} from '../authentication/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit {
  public posts = [];
  private pullable = true;
  private currentAddress = '/';
  private loggedIn = false;
  public userId = '';

  constructor(private postService: PostService, private router: Router, private tokenService: TokenService) { }
  ngOnInit() {
    // get user id
    this.userId = localStorage.getItem('userId');
    if (this.userId === '') {
      this.userId = sessionStorage.getItem('userId');
    }
    this.currentAddress = this.router.url.toString();
    this.currentAddress = this.currentAddress.substr(1, this.currentAddress.length );
    this.postService.getPost(this.currentAddress, this.posts.length)
    .subscribe(data => this.posts = data, error => console.log(error));
    this.loggedIn = this.tokenService.loggedIn();
    console.log(this.loggedIn);
  }

  ngAfterViewInit() {
    window.onscroll = _ => {
      if ( this.pullable && ( window.scrollY + window.innerHeight) / document.body.scrollHeight >= 0.95) {
        this.postService.getPost(this.currentAddress, this.posts.length)
        .subscribe(
            data => {
              if (data.length > 0) {
                this.posts = this.posts.concat(data);
              } else {
                this.pullable = false;
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    };
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}



