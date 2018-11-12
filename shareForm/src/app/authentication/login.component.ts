import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegistrareService } from './registrate.service';
import { LoginService } from './login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  loginInRequestData = {email: '', password: ''};
  signUpRequestData = {email: '', password: ''};
  private is_login_hidden = false ;

  constructor(private router: Router, private location: Location, private _reg: RegistrareService, private _log: LoginService) { }
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

  ngAfterViewInit() {
    // jquery to avoid user typing space to username
    $('#inputUsername').on({
      keydown: function(e) {
        if (e.which === 32) {
          return false;
        }
      },
      change: function() {
        this.value = this.value.replace(/\s/g, '');
      }
    });
  }

  logIn() {
    console.log(this.loginInRequestData);

    this._log.loginInRequest(this.loginInRequestData)
    .subscribe(
    res => console.log(res),
    error => console.log(error)
    );
    this.router.navigate(['/']);
  }

  singUp() {
    this._reg.signUpRequest(this.signUpRequestData)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      );
      this.is_login_hidden = false;
    }

}
