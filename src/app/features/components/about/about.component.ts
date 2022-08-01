import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'src/app/core/models/profile.model';

import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AboutFormComponent } from './about-form/about-form.component';
import { SocialFormComponent } from '../social/social-form/social-form.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  isLoggedIn: boolean = false;
  profile!: Profile;

  private modalRef!: NgbModalRef;
  private modalOption: NgbModalOptions = {};

  fullname!: String;
  about!:String;
  title!:String;

  @Output() btnClickSection = new EventEmitter();

  clickHandlerEditAbout() {
    this.modalRef = this.modalService.open(AboutFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Editar perfil";
    this.modalRef.componentInstance.profile = this.profile;
    this.modalRef.result.then((result: Profile) => {
      this.getProfile();

    }, (reason) => {
      console.log("Dismiss");
    });
  }

  getProfile() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.profileService.getById(id).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.fullname = this.profile.name + " " + this.profile.lastname;
        this.about = this.profile.about;
        this.title = this.profile.title;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  clickHandlerSocial(){
    this.modalRef = this.modalService.open(SocialFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Redes sociales";
    this.modalRef.componentInstance.profile = this.profile;
    this.modalRef.result.then((result: Profile) => {
      this.getProfile();

    }, (reason) => {
      console.log("Dismiss");
    });
  }

  clickHandlerSections() {
    this.btnClickSection.emit();
  }

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getProfile();
  }
}
