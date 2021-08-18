import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {RegisterModalComponent} from "../../components/register-modal/register-modal.component";
import {User} from "../../models/User";
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
    this.whenModalClosed();
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

  whenModalClosed() {
    console.log("func: when model closed")
    this.modalReference.closed.subscribe(
      () => {
        const user: RegisterRequest = this.modalReference.componentInstance.user;
        console.log(this.modalReference);
        console.log("calıs be abim");
        this.loginForm.patchValue({
          username: user.username,
          password: user.password
        });
      }
    );

    /**
     * this.loginForm.patchValue({
        username: res.username,
        password: res.password
      });
     */
    // this.modalReference.closed.subscribe(() => {
    //   this.loginForm.patchValue({
    //     username: user.username,
    //     password: user.password
    //   });
    // });
  }
}
