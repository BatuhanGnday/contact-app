import { Component, OnInit } from '@angular/core';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddContactModalComponent} from "../add-contact-modal/add-contact-modal.component";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  presentAddContactModal() {
    let ref = this.modalService.open(AddContactModalComponent, {
      centered: true,
      animation: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  profileButton() {
    let user: User = JSON.parse(<string>localStorage.getItem("user")) as User;
    let userId = user.guid;
    this.router.navigate([`/profile/${userId}`]);
  }
}
