import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Education } from 'src/app/core/models/education.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { EducationService } from 'src/app/core/services/education.service';
import { EducationFormComponent } from './education-form/education-form.component';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.scss']
})

export class EducationsComponent implements OnInit {
  isLoggedIn: boolean = false;
  educations!: Education[];

  private modalOption: NgbModalOptions = {};
  private modalRef!: NgbModalRef;

  title: String = "Educación";

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private educationService: EducationService,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.educationService.getAllByProfileId(id).subscribe({
      next: (data: Education[]) => {
        this.educations = data;
      },
      error: (err: ErrorMessage) => {

      }
    });
  }

  clickHandlerCreate() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.modalRef = this.modalService.open(EducationFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Crear Educación";
    this.modalRef.componentInstance.editMode = false;
    this.modalRef.result.then((result: Education) => {
      this.educationService.createByProfileId(id, result).subscribe({
        next: (data: Education) => {
        },
        error: (err: ErrorMessage) => {
        }
      });
    }, (reason) => {
      console.log("Dismiss");
    });
  }
}