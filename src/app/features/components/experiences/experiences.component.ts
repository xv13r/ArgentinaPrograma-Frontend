import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Experience } from 'src/app/core/models/experience.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExperienceService } from 'src/app/core/services/experience.service';
import { ExperienceFormComponent } from './experience-form/experience-form.component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})

export class ExperiencesComponent implements OnInit {
  isLoggedIn: boolean = false;
  experiences!: Experience[];

  private modalOption: NgbModalOptions = {};
  private modalRef!: NgbModalRef;

  title: String = "Experiencia";

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private experienceService: ExperienceService,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.experienceService.getAllByProfileId(id).subscribe({
      next: (data: Experience[]) => {
        this.experiences = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  clickHandlerCreate() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.modalRef = this.modalService.open(ExperienceFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Crear Experiencia";
    this.modalRef.componentInstance.editMode = false;
    this.modalRef.result.then((result: Experience) => {
      this.experienceService.createByProfileId(id, result).subscribe({
        next: (data: Experience) => {

        },
        error: (err: ErrorMessage) => {
        }
      });
    }, (reason) => {
      console.log("Dismiss");
    });
  }
}