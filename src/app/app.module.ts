import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './scenes/login/login.component';
import { HomeComponent } from './scenes/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import { ListItemComponent } from './scenes/home/components/list-item/list-item.component';
import { AddContactComponent } from './scenes/add-contact/add-contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './scenes/register/register.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { ContactDetailModalComponent } from './components/contact-detail-modal/contact-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListItemComponent,
    AddContactComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterModalComponent,
    ContactDetailModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
