import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { PostComponent } from './post/post.component';
import { LogoutComponent } from './authentication/logout.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component: PostComponent},

  { path: 'login', component: LoginComponent},
  { path: 'signup', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},

  { path: 'submit', component: NewPostComponent},
  { path: 'p/:id/update',  component: NewPostComponent},

  { path: 'animate', component: PostComponent},
  { path: 'game', component: PostComponent},
  { path: 'novel', component: PostComponent},

  { path: 'p/:id',  component: PostDetailComponent},

  { path: '', children: [
      { path: 'animate', children: [{ path: ':id',  component: PostDetailComponent}]},
      { path: 'game', children: [{ path: ':id',  component: PostDetailComponent}]},
      { path: 'novel',  children: [{ path: ':id',  component: PostDetailComponent}]},
    ]
  },

  { path: '404', component: PostComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
