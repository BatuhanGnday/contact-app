import {Component, EventEmitter, Host, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {Contact} from "../../models/contact/Contact";
import {ContactService} from "../../services/contact/contact.service";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import { debounceTime, map } from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContactDetailModalComponent} from "../../components/contact-detail-modal/contact-detail-modal.component";
import { SweetAlertResult } from 'sweetalert2';
import Swal from "sweetalert2";
import {AddContactModalComponent} from "../../components/add-contact-modal/add-contact-modal.component";

export interface SearchContactFormModel {
  fullName?: string;
  address?: string;
  province?: string;
  district?: string;
  phoneNumber?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contacts: BehaviorSubject<Contact[]>;
  searchForm: FormGroup;
  activeUser: User;

  page: number = 1;
  pageSize: number = 20;
  collectionSize: number;

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    //@Host() private addContactModal: AddContactModalComponent
  ) { }

  ngOnInit(): void {
    this.activeUser = JSON.parse(<string>localStorage.getItem("user")) as User;

    this.createForm();
    this.contacts = new BehaviorSubject<Contact[]>([]);
    this.loadInitialData();
    this.onValueChange();
  }

  loadInitialData() {
    this.contactService.fetchUserContacts().subscribe((e: Contact[])=>{
      this.collectionSize = e.length;
      this.contacts.next(e);
    });
  }

  havePermission(item: Contact): boolean {
    return item.owner.guid != this.activeUser.guid;
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      fullName: [],
      address: [],
      province: [],
      district: [],
      phoneNumber: []
    });
  }

  searchContacts() {
    let model = this.searchForm.value as SearchContactFormModel;
    let result = this.contactService.fetchUserContacts(model);
    result.subscribe(e => {
      // FOR DEBUGGING RESULTS
      // for (let contact of e) {
      //   console.log(contact)
      // }
      this.contacts.next(e);
    });
  }

  onValueChange() {
    this.searchForm.valueChanges.pipe(
      debounceTime(400)
    ).subscribe( () => {
      this.searchContacts();
    });
  }

  presentEditContactModal(item: Contact) {
    let modalRef = this.modalService.open(ContactDetailModalComponent);
    let modalInstance = modalRef.componentInstance;
    modalInstance.contact = new BehaviorSubject(item);
    modalRef.closed.subscribe((next: Contact) => {
      let indexOfItem = this.contacts.value.indexOf(item);
      this.contacts.value[indexOfItem] = next;
      this.contacts.next(this.contacts.value);
    });
  }

  deleteButton(item: Contact) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.contactService.deleteContactByGuid(item.guid).subscribe((e: Contact) => {
          let result = this.contacts.value.filter(e => e.guid !== item.guid);
          this.contacts.next(result);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
