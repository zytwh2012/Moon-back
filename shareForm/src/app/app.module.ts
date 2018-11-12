import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './authentication/login.component';
import { FormsModule } from '@angular/forms';

import { MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material';
import { MatToolbarModule} from '@angular/material/toolbar';
import { PostService } from './post/post.service';
import { HttpClientModule } from '@angular/common/http';
import { MyMaterialModule } from './app.mymaterial';
import { RegistrareService} from './authentication/registrate.service';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NgbModule.forRoot(),
    FormsModule,
    MyMaterialModule
  ],
  providers: [PostService, RegistrareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
