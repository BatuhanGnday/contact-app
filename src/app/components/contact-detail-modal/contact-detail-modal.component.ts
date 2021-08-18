import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/contact/Contact";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contact-detail-modal',
  templateUrl: './contact-detail-modal.component.html',
  styleUrls: ['./contact-detail-modal.component.scss']
})
export class ContactDetailModalComponent implements OnInit {

  @Input()
  contact: Contact;
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      fullName: [this.contact.fullName],
      phoneNumber: [this.contact.phoneNumber],
      address: [this.contact.address],
      province: [this.contact.province],
      district: [this.contact.district]
    });
  }

}
