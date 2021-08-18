import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterRequest} from "../../models/auth/register/RegisterRequest";

export interface RegisterFormModel {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

  @Output()
  user: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();


  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: [],
      fullName: [],
      email: [],
      password: []
    });
  }

  registerButtonOnClick() {
    let model: RegisterFormModel = this.registerForm.value;
    let request: RegisterRequest = new RegisterRequest(
      model.username,
      model.fullName,
      model.email,
      model.password
    );

    this.authService.register(request).subscribe(
      () => {
        // TODO : handle in more secure way or login directly
        this.activeModal.close(request);
      },
      error => {
        console.log(error)
        this.error = error;
      }
    );
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
