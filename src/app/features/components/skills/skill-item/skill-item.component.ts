import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Skill } from 'src/app/core/models/skill.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { SkillService } from 'src/app/core/services/skill.service';
import { SkillFormComponent } from '../skill-form/skill-form.component';

@Component({
    selector: 'skill-item',
    templateUrl: './skill-item.component.html',
    styleUrls: ['./skill-item.component.scss']
})

export class SkillItemComponent implements OnInit {
    isLoggedIn: boolean = false;
    @Input() skill!: Skill;

    private modalRef!: NgbModalRef;
    private modalOption: NgbModalOptions = {};
           
    name!:String;
    description!:String;
    progress!:Number;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private skillService: SkillService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.isLoggedIn = this.authService.isLoggedIn();

        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;

        this.name = this.skill.name;
        this.description = this.skill.description;
        this.progress = this.skill.progress;
    }

    clickHandlerEdit(id: any) {
        this.modalRef = this.modalService.open(SkillFormComponent, this.modalOption);
        this.modalRef.componentInstance.title = "Editar Hablidad";
        this.modalRef.componentInstance.editMode = true;
        this.modalRef.componentInstance.skill = this.skill;
        this.modalRef.result.then((result: Skill) => {
            this.skillService.update(id, result).subscribe({
                next: (data: Skill) => {
                    this.skill = data;
                },
                error: (err: ErrorMessage) => {
                }
            });
        }, (reason) => {
            console.log("Dismiss");
        });
    }

    clickHandlerDelete(id: any) {
        this.skillService.delete(id).subscribe({
            error: (err: ErrorMessage) => {
            }
        });
    }
}