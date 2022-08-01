import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { Session } from 'src/app/core/models/session.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  submitted: boolean = false;
  errorMessage!:String;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.redirect(this.authService.getRoles());
    }
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (data: Session) => {
        this.isLoginFailed = false;
        this.sessionService.setCurrentSession(data);
        this.redirect(this.authService.getRoles());
      },
      error: (err: ErrorMessage)  => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    });
  }

  getProfile(){
    const userId = this.authService.getUserId();
    this.profileService.getByUserId(userId).subscribe({
      next: (data: Profile) => {
        console.log("Por aca");
        console.log(data);
        this.isLoginFailed = false;
        this.router.navigate([`profile/${data.id}`]);
      },
      error: (err: ErrorMessage)  => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirect(role: string[]) {
    if (role.includes("ROLE_ADMIN")) {
      this.router.navigate(['protected']);
    }
    else{
      this.getProfile();
    }
  }

  get emailForm() {
    return this.form.get('email');
  }

  get passwordForm() {
    return this.form.get('password');
  }
}