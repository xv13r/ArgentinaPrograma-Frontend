import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-firsttime-form',
  templateUrl: './firsttime-form.component.html',
  styleUrls: ['./firsttime-form.component.scss']
})

export class FirstTimeFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed: boolean = false;
  profile!:Profile;
  errorMessage!: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      about: ['', [Validators.required]],
      title: ['', [Validators.required]]
     });
  }

  onBirthdayChange(date: Date) {
    this.form.controls['birthday'].setValue(date);
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    const {name, lastname, birthday, about,  title} = this.form.value;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let profile = new Profile();
    profile.name = name;
    profile.lastname = lastname;
    profile.birthday = birthday;
    profile.about = about;
    profile.title = title;
    profile.userId = id;

    this.profileService.create(profile).subscribe({
      next: (data: Profile) => {

        this.router.navigate([`profile/${data.id}`]);
      },
      error: (err: ErrorMessage) => {
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    });
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
