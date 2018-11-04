import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string ;
  public password: string ;
  private is_login_hidden = false ;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signInUpSubmit() {
    this.is_login_hidden = !this.is_login_hidden;
  }
}
