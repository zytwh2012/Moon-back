import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegistrareService } from './registrate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  signUpRequestData = {};
  private is_login_hidden = false ;

  constructor(private router: Router, private location: Location, private _reg: RegistrareService) { }
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

  singUp() {
    this._reg.signUpRequest(this.signUpRequestData)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      );
  }

}
