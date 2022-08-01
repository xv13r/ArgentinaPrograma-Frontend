import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { Social } from 'src/app/core/models/social.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SocialService } from 'src/app/core/services/socials.service';

@Component({
  selector: 'app-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.scss']
})

export class SocialFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!:String;
  social!:Social[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private socialService: SocialService) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      facebook: [this.social[0].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      github: [this.social[1].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      instagram: [this.social[2].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      linkedin: [this.social[3].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      reddit: [this.social[4].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      tiktok: [this.social[5].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      twitter: [this.social[6].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      youtube: [this.social[7].name, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]]
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

    this.socialService.getAllByProfileId(params['id']).subscribe({
      next: (data: Social[]) => {
        this.social = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }
  onSubmitFacebook(){
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
    let social = new Social();
    social.name = "facebook";
    social.url = this.form.value['facebook'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitGithub(){
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
    let social = new Social();
    social.name = "github";
    social.url = this.form.value['github'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitInstagram(){
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
    let social = new Social();
    social.name = "instagram";
    social.url = this.form.value['instagram'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitLinkedin(){
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
    let social = new Social();
    social.name = "linkedin";
    social.url = this.form.value['linkedin'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitReddit(){
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
    let social = new Social();
    social.name = "reddit";
    social.url = this.form.value['reddit'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitTiktok(){
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
    let social = new Social();
    social.name = "tiktok";
    social.url = this.form.value['tiktok'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitTwitter(){
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
    let social = new Social();
    social.name = "twitter";
    social.url = this.form.value['twitter'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }
  onSubmitYoutube(){
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
    let social = new Social();
    social.name = "youtube";
    social.url = this.form.value['youtube'];
    this.socialService.createByProfileId(params['id'], social).subscribe({
      next: (data: Social) => {
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  get facebookForm() {
    return this.form.get('facebook');
  }

  get githubForm() {
    return this.form.get('github');
  }

  get instagramForm() {
    return this.form.get('instagram');
  }

  get linkedinForm() {
    return this.form.get('linkedin');
  }

  get redditForm() {
    return this.form.get('reddit');
  }

  get tiktokForm() {
    return this.form.get('tiktok');
  }

  get twitterForm() {
    return this.form.get('twitter');
  }

  get youtubeForm() {
    return this.form.get('youtube');
  }
}
