import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './authentication/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'shareForum';

  ngOnInit() {
    const dancing_grils = document.getElementById('girls');
    dancing_grils.style.position = 'fixed';
  }

  ngAfterViewInit() {

  }
}
