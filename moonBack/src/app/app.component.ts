import { Component, AfterViewInit, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'shareForum';

  ngOnInit() {
    const dancingGrilsGif = document.getElementById('girls');
    dancingGrilsGif.style.position = 'fixed';
  }

  ngAfterViewInit() {

  }
}
