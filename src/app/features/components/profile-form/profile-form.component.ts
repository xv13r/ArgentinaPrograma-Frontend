import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})

export class ProfileFormComponent implements OnInit {
  @Input() title!: String;
  @Input() model: User | null = null;

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl(''),
    });

    if (this.model !== null) {
      this.form.controls['username'].setValue(this.model.username);
      this.form.controls['email'].setValue(this.model.email);
      this.form.controls['password'].setValue(this.model.password);
      // this.form.controls['confirm'].setValue(this.model.confirm);
    }
  }

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.form.value, null, 2));

    this.activeModal.close();
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