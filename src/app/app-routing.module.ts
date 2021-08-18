import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./scenes/login/login.component";
import {HomeComponent} from "./scenes/home/home.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {AddContactComponent} from "./scenes/add-contact/add-contact.component";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'home',
    component : HomeComponent,
    // TODO
    canActivate : [AuthGuard]
  },
  {
    path: 'contact',
    component: AddContactComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
