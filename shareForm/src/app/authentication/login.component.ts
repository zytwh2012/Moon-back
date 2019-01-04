import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegistrareService } from './registrate.service';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

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
  private is_remember_me = true;

  constructor(private router: Router,
              private location: Location,
              private _reg: RegistrareService,
              private _log: LoginService,
              private _tokenserver: TokenService) { }
  ngOnInit() {
    // 什么user id 乱起名字
    const user_id = this._tokenserver.loggedIn();

    if (user_id) {
      this.router.navigate(['/']);
    } else {
      if (this.location.isCurrentPathEqualTo('/login')) {
        this.is_login_hidden = false ;
      } else if (this.location.isCurrentPathEqualTo('/signup')) {
        this.is_login_hidden = true ;
      } else {
        console.log('error login unknown url', this.router.url );
        this.is_login_hidden = false ;
      }
    }

    // set fixed
    const dancing_grils = document.getElementById('girls');
    dancing_grils.style.position = 'fixed';
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
    this._log.loginInRequest(this.loginInRequestData)
      .subscribe(
        // todo: return a json user, check user's active status
        // is actived, save it to cookie and redirected to router
        res => {
          if (res) {
            // if not 'remember me'
            if (this.is_remember_me) {
              localStorage.setItem('refreshToken', res.data.refreshToken);
              localStorage.setItem('user_id', this.loginInRequestData.email);
              sessionStorage.removeItem('refreshToken'); // in case
              sessionStorage.removeItem('ruser_id');
            } else {
              sessionStorage.setItem('refreshToken', res.data.refreshToken);
              sessionStorage.setItem('user_id', this.loginInRequestData.email);
              localStorage.removeItem('refreshToken'); // in case
              localStorage.removeItem('user_id'); // in case
            }
            sessionStorage.setItem('accessToken', res.data.accessToken);
            this.router.navigate(['/']);
          }
        },
        error => console.log(error, 'here error')
      );
  }

  signUp() {
    this._reg.signUpRequest(this.signUpRequestData)
      .subscribe(
        res => {
          console.log(res);
          this.is_login_hidden = false;
        },
        error => {
          console.log(error);
          this.is_login_hidden = true;
        }
      );
  }

}
