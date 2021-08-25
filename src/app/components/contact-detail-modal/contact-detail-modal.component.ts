import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/contact/Contact";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactService} from "../../services/contact/contact.service";
import {PatchContactRequest} from "../../models/contact/patch/PatchContactRequest";
import {BehaviorSubject} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Swal, {SweetAlertResult} from "sweetalert2";

@Component({
  selector: 'app-contact-detail-modal',
  templateUrl: './contact-detail-modal.component.html',
  styleUrls: ['./contact-detail-modal.component.scss']
})
export class ContactDetailModalComponent implements OnInit {

  @Input()
  contact: BehaviorSubject<Contact>;
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      fullName: [this.contact.value.fullName],
      phoneNumber: [this.contact.value.phoneNumber],
      address: [this.contact.value.address],
      province: [this.contact.value.province],
      district: [this.contact.value.district]
    });
  }

  onSubmit() {
    const {
      fullName,
      phoneNumber,
      address,
      province,
      district
    } = this.contactForm.value;
    let body: PatchContactRequest = new PatchContactRequest(fullName, phoneNumber, address, province, district);
    this.contactService.patchContact(this.contact.value.guid, body).subscribe((next: Contact) => {
      this.contact.next(next);
      this.activeModal.close(next);
    });
    Swal.fire({
      icon: 'success',
      title: 'Contact has been updated',
      showConfirmButton: false,
      timer: 1500
    });
  }

  onDiscard() {
    Swal.fire({
      title: "Discard Changes",
      text: "Changes will not be saved. Do you want to proceed?",
      showCancelButton: true,
      icon: "question",
      confirmButtonText: 'Discard',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.contact.next(this.contact.value);
        this.activeModal.close(this.contact.value);
      }
    });
  }
}
