import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import { NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {RegisterModalComponent} from "../../components/register-modal/register-modal.component";
import {RegisterRequest} from "../../models/auth/register/RegisterRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  modalReference: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username : [],
      password : []
    });
  }

  activateRegisterModal() {
    let reference = this.modalService.open(RegisterModalComponent, {
      centered: true,
      animation: true
    });

    reference.closed.subscribe((e: RegisterRequest) => {
      this.loginForm.patchValue({
        username: e.username,
        password: e.password
      });
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    console.log(username);
    console.log(password);
    this.authService.login(username, password);
    this.router.navigate(['/home']);
  }
}
