import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Session } from 'src/app/core/models/session.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;
  submitted: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage!:String;
  
  private userId!:String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required])
    });
  }

  onPasswordChange() {
    const password = this.form.get('password')?.value;
    const confirmation = this.form.get('confirm')?.value;

    if (password === confirmation) {
      this.form.controls['confirm'].setErrors(null);
    } else {
      this.form.controls['confirm'].setErrors({ notmatched: true });
    }
  }

  onSubmit(): void {

    const { username, email, password } = this.form.value;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.autologin(email, password);
      },
      error: (err: ErrorMessage) => {
        console.log(err);
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    });
  }

  autologin(email: string, password: string){
    this.authService.login(email, password).subscribe({
      next: (data: Session) => {
        this.sessionService.setCurrentSession(data);
        this.userId = this.authService.getUserId();
        this.router.navigate([`profile/${this.userId}/firsttime`]);
      }
    })
  }

  get usernameForm() {
    return this.form.get('username');
  }

  get emailForm() {
    return this.form.get('email');
  }

  get passwordForm() {
    return this.form.get('password');
  }

  get confirmForm() {
    return this.form.get('confirm');
  }
}