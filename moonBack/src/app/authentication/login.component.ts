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
  private loginIsHidden = false ;
  private rememberMeOn = true;

  constructor(private router: Router,
              private location: Location,
              private reg: RegistrareService,
              private log: LoginService,
              private tokenserver: TokenService) { }
  ngOnInit() {

    const loggedIn = this.tokenserver.loggedIn();

    if (loggedIn) {
      this.router.navigate(['/']);
    } else {
      if (this.location.isCurrentPathEqualTo('/login')) {
        this.loginIsHidden = false ;
      } else if (this.location.isCurrentPathEqualTo('/signup')) {
        this.loginIsHidden = true ;
      } else {
        console.log('error login unknown url', this.router.url );
        this.loginIsHidden = false ;
      }
    }

    // set fixed
    const dancingGrilsGif = document.getElementById('girls');
    dancingGrilsGif.style.position = 'fixed';
  }

  ngAfterViewInit() {
    // jquery to avoid user typing space to username
    $('#inputUsername').on({
      keydown: function(error) {
        if (error.which === 32) {
          return false;
        }
      },
      change: function() {
        this.value = this.value.replace(/\s/g, '');
      }
    });

  }

  logIn() {
    this.log.loginInRequest(this.loginInRequestData)
      .subscribe(
        // todo: return a json user, check user's active status
        // is actived, save it to cookie and redirected to router
        res => {
          if (res) {
            // if not 'remember me'
            if (this.rememberMeOn) {
              localStorage.setItem('refreshToken', res.data.refreshToken);
              localStorage.setItem('userId', this.loginInRequestData.email);
              sessionStorage.removeItem('refreshToken'); // in case
              sessionStorage.removeItem('userId');
            } else {
              sessionStorage.setItem('refreshToken', res.data.refreshToken);
              sessionStorage.setItem('userId', this.loginInRequestData.email);
              localStorage.removeItem('refreshToken'); // in case
              localStorage.removeItem('userId'); // in case
            }
            sessionStorage.setItem('accessToken', res.data.accessToken);
            this.router.navigate(['/']);
          }
        },
        error => console.log(error, 'logIn() error')
      );
  }

  signUp() {
    this.reg.signUpRequest(this.signUpRequestData)
      .subscribe(
        res => {
          this.loginIsHidden = false;
        },
        error => {
          console.log(error, 'signUp() error');
          this.loginIsHidden = true;
        }
      );
  }

}
