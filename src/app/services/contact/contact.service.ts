import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../../models/contact/Contact";
import {environment} from "../../../environments/environment";
import {SearchContactFormModel} from "../../scenes/home/home.component";
import {CreateContactRequest} from "../../models/contact/post/CreateContactRequest";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  fetchUserContacts(model?: SearchContactFormModel): Observable<Contact[]> {
    let params: HttpParams = new HttpParams();
    console.log(model)
    if (model != null) {
      if (model.fullName != null) {
        params = params.append("name", model.fullName);
      }
      if (model.phoneNumber != null) {
        params = params.append("phoneNumber", model.phoneNumber);
      }
      if (model.address != null) {
        params = params.append("address", model.address);
      }
      if (model.province != null) {
        params = params.append("province", model.province);
      }
      if (model.district != null) {
        params = params.append("district", model.district);
      }
    }

    const url: string = `${environment.apiUrl}contacts`;
    return this.http.get<Contact[]>(url, { params: params });
  }

  createContact(body: CreateContactRequest): void {
    const url: string = `${environment.apiUrl}contacts`;
    let contactObservable = this.http.post<Contact>(url, body, {observe: "response"}).subscribe(
      e => {
        console.log(e.type.toString());
      }
    );
  }
}
