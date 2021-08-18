import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../models/auth/login/LoginRequest";
import { LoginResponse } from "../../models/auth/login/LoginResponse";
import { environment } from "../../../environments/environment";
import {RegisterRequest} from "../../models/auth/register/RegisterRequest";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): void {
    const url: string = `${environment.apiUrl}auth/login`;
    const body: LoginRequest = new LoginRequest(username, password);
    this.httpClient.post<LoginResponse>(url, body, {observe: "response"}).subscribe(e => {
        if (e.status !== 200) {
          throw Error(`Response status code was ${e.status}`);
        }
        if (e.body != null) {
          localStorage.setItem("token", e.body.token);
          localStorage.setItem("user", JSON.stringify(e.body.user));
        }
        return e.body;
      }, error => {
        console.log(error);
      }
    );
  }

  // TODO
  register(body: RegisterRequest): Observable<User> {
    const url: string = `${environment.apiUrl}auth/register`;
    return this.httpClient.post<User>(url, body);
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}
