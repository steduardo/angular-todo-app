import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;
  public signupErrorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      'email': ['', Validators.required],
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.confirmationForm = this.fb.group({
      'email': ['', Validators.required],
      'confirmationCode': ['', Validators.required]
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email, password = value.password;
    const attr = {};
    attr['email'] = value.email;
    if (value.name) {
      attr['name'] = value.name;
    }
    this.auth.signUp(email, password, attr)
      .subscribe(
        result => {
          this.successfullySignup = true;
        },
        error => {
          console.log(error);
          this.signupErrorMsg = error.message;
        });
  }

  onSubmitConfirmation(value: any) {
    const email = value.email, confirmationCode = value.confirmationCode;
    this.auth.confirmSignUp(email, confirmationCode)
      .subscribe(
        result => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        });
  }
}
