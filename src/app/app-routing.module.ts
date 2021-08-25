import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./scenes/login/login.component";
import {HomeComponent} from "./scenes/home/home.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {LoginGuard} from "./guards/login/login.guard";
import {ProfileComponent} from "./scenes/profile/profile.component";
import {PageNotFoundComponent} from "./scenes/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path : 'home',
    component : HomeComponent,
    // TODO
    canActivate : [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
