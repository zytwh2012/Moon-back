import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string ;
  public password: string ;
  private is_login_hidden = false ;

  constructor(private router: Router, private location: Location) { }
  ngOnInit() {
    if (this.location.isCurrentPathEqualTo('/login')) {
      this.is_login_hidden = false ;
    } else if (this.location.isCurrentPathEqualTo('/signup')) {
      this.is_login_hidden = true ;
    } else {
      console.log('error login unknown url', this.router.url );
      this.is_login_hidden = false ;
    }
  }

}
