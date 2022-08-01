import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/core/models/skill.model';

import { SkillService } from 'src/app/core/services/skill.service';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorMessage } from 'src/app/core/models/error-message';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})

export class SkillsComponent implements OnInit {
  isLoggedIn: boolean = false;
  skills!: Skill[];

  private modalOption: NgbModalOptions = {};
  private modalRef!: NgbModalRef;

  title: String = "Habilidad";

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private skillService: SkillService,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.skillService.getAllByProfileId(id).subscribe({
      next: (data: Skill[]) => {
        this.skills = data;
      },
      error: (err: ErrorMessage) => {

      }
    });
  }

  clickHandlerCreate() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.modalRef = this.modalService.open(SkillFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Crear Habilidad";
    this.modalRef.componentInstance.editMode = false;
    this.modalRef.result.then((result: Skill) => {
      this.skillService.createByProfileId(id, result).subscribe({
        next: (data: Skill) => {
        },
        error: (err: ErrorMessage) => {
        }
      });
    }, (reason) => {
      console.log("Dismiss");
    });
  }
}