import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './scenes/login/login.component';
import { HomeComponent } from './scenes/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import { ListItemComponent } from './scenes/home/components/list-item/list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './scenes/register/register.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { ContactDetailModalComponent } from './components/contact-detail-modal/contact-detail-modal.component';
import {NgbDatepickerModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { ContactSearchBarComponent } from './components/contact-search-bar/contact-search-bar.component';
import { AddContactModalComponent } from './components/add-contact-modal/add-contact-modal.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ProfileComponent } from './scenes/profile/profile.component';
import { PageNotFoundComponent } from './scenes/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListItemComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterModalComponent,
    ContactDetailModalComponent,
    ContactSearchBarComponent,
    AddContactModalComponent,
    ConfirmationDialogComponent,
    ProfileComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
