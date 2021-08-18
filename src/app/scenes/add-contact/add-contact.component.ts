import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactService} from "../../services/contact/contact.service";
import {Router} from "@angular/router";
import {CreateContactRequest} from "../../models/contact/post/CreateContactRequest";

export interface ContactFormModel {
  fullName: string;
  phoneNumber: string;
  address: string;
  province: string;
  district: string;
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      fullName: [],
      phoneNumber: [],
      address: [],
      province: [],
      district: []
    });
  }

  submit(): void {
    const model: ContactFormModel = this.contactForm.value;
    console.log(model);
    this.contactService.createContact(new CreateContactRequest(
      model.fullName,
      model.phoneNumber,
      model.address,
      model.province,
      model.district
    ));
    this.router.navigate(['/home']);
  }
}
