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

  constructor(private router: Router,
              private location: Location,
              private _reg: RegistrareService,
              private _log: LoginService) {}

  ngOnInit() {
    const user_id = sessionStorage.getItem('refreshToken');

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
          console.log(res)
          if (res) {
            // if not 'remember me'
            sessionStorage.setItem('accessToken', res.accessToken);
            sessionStorage.setItem('refreshToken', res.refreshToken);
            // this.router.navigate(['/']);
            console.log(sessionStorage.getItem('accessToken'));
          }
        },
        error => console.log(error, 'here error')
      );
  }

  signUp() {
    this._reg.signUpRequest(this.signUpRequestData)
      .subscribe(
        res => {
          this.is_login_hidden = false;
        },
        error => {
          console.log(error);
          this.is_login_hidden = true;
        }
      );
  }

}
