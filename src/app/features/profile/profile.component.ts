import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { Social } from 'src/app/core/models/social.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SectionFormComponent } from '../components/section-form/section-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  private modalRef!: NgbModalRef;
  private modalOption: NgbModalOptions = {};

  profile!: Profile;
  user!: User;

  socials!: Social[];

  sections: any = {
    experiences: true,
    educations: true,
    skills: true,
    proyects: true
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private modalService: NgbModal
  ) { }

  clickHandlerSection() {
    this.modalRef = this.modalService.open(SectionFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Agregar sección";
    this.modalRef.componentInstance.sections = this.sections;
    this.modalRef.result.then((result) => {
      this.sections = result;
    }, (reason) => {
      console.log("Dismiss");
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profileService.getById(id).subscribe({
        next: (data: Profile) => {
          this.profile = data;
        },
        error: (err: ErrorMessage) => {
        }
      });
    }
  }
}
//  this.banner = 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
//  this.avatar = 'https://picsum.photos/200';