import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss']
})

export class AboutFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!:String;
  profile!:Profile;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [this.profile.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]],
      lastname: [this.profile.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]],
      birthday: [this.profile.birthday, [Validators.required]],
      about: [this.profile.name, [Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]],
      title: [this.profile.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]],
     });
  }

  getProfile() {
    const getLastChild = (route: ActivatedRouteSnapshot) => {
      let child = route;
      while (child.firstChild) {
        child = child.firstChild
      }
      return child;
    }

    const primary = this.route.snapshot.root;
    const lastChild = getLastChild(primary);
    const params = lastChild.params;

    this.profileService.getById(params['id']).subscribe({
      next: (data: Profile) => {
        this.profile = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    const {name, lastname, birthday, about,  title} = this.form.value;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let profile = new Profile();
    profile.name = name;
    profile.lastname = lastname;
    profile.birthday = birthday;
    profile.avatarId = this.profile.avatarId;
    profile.bannerId = this.profile.bannerId;
    profile.about = about;
    profile.title = title;
    profile.userId = this.profile.userId;

    console.log(profile);

    this.profileService.update(this.profile.id as string, profile).subscribe({
      next: (data: Profile) => {
        this.isSignUpFailed = false;
      },
      error: (err: ErrorMessage) => {
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    });

    this.activeModal.close(profile);
  }

  get nameForm() {
    return this.form.get('name');
  }

  get lastnameForm() {
    return this.form.get('lastname');
  }

  get birthdayForm() {
    return this.form.get('birthday');
  }

  get aboutForm() {
    return this.form.get('about');
  }

  get titleForm() {
    return this.form.get('title');
  }
}