import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output()
  contact: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadInitialData();
    this.contacts = new BehaviorSubject<Contact[]>([]);
    this.onValueChange();
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

  loadInitialData() {
    this.contactService.fetchUserContacts().subscribe(e=>{
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

  buttonOnClick() {
    console.log(localStorage.getItem("user"));
    let str = localStorage.getItem("user");
    if (str != null) {
      let json = JSON.parse(str);
      let user: User = json as User;
      console.log(user)
    }
    this.authService.logout();
    this.router.navigate(['/login']);
  }



  addContactButtonOnClick() {
    this.router.navigate(['/contact']);
  }

  itemClick(item: Contact) {
    let modalRef = this.modalService.open(ContactDetailModalComponent).componentInstance;
    modalRef.contact = item;
    this.contact.next(item);
    console.log(item.district);
  }
}
