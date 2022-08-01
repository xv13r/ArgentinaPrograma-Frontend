// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

// import { AuthService } from '../../../../core/services/auth.service';

// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.scss']
// })
// export class LoginFormComponent implements OnInit {
//   form!: FormGroup;
//   loading = false;
//   submitted = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,) { }

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   get f() { return this.form.controls; }

//   onSubmit() {
//     this.submitted = true;

//     if (this.form.invalid) {
//       return;
//     }
//     this.loading = true;
//     this.authService.login(this.form.controls['username'].value, this.form.controls['password'].value)
//     .pipe(first())
//     .subscribe({
//         next: () => {
//             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//             this.router.navigateByUrl(returnUrl);
//         },
//         error: error => {
//             this.loading = false;
//         }
//     });
//   }
// }
