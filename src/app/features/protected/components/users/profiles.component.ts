import { Component, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { CardConfirmComponent } from 'src/app/shared/components/card/confirm/confirm.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})

export class ProfilesComponent implements OnInit {
  faTrash = faTrash;
  errorMessage!:String;

  public items: Profile[] = [];
  public isMenuCollapsed = true;
  
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getAll().subscribe({
      next: (profiles:Profile[]) => {
        this.items = profiles;
      },
      error: (err: ErrorMessage) => {
        this.errorMessage = err.message;
      }
    });
  }

  clickHandlerDelete(id: String) {
    const modalRef = this.modalService.open(CardConfirmComponent);
    modalRef.result.then((result) => {
      this.profileService.delete(id).subscribe({
        next: () => {
          this.items = this.items.filter(item => item.id != id);
        },
        error: (err: ErrorMessage) => {
          this.errorMessage = err.message;
        }})
    }, (reason) => {
      // this.closeResult = reason;
    });
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authService.logout();
  }
}