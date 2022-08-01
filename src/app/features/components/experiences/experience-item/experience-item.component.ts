import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Employment } from 'src/app/core/models/employment.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Experience } from 'src/app/core/models/experience.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExperienceService } from 'src/app/core/services/experience.service';
import { UploadService } from 'src/app/core/services/file.service';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';

@Component({
    selector: 'experience-item',
    templateUrl: './experience-item.component.html',
    styleUrls: ['./experience-item.component.scss']
})

export class ExperienceItemComponent implements OnInit {
    isLoggedIn: boolean = false;
    @Input() experience!: Experience;

    private modalRef!: NgbModalRef;
    private modalOption: NgbModalOptions = {};
           
    company!:String;
    description!:String;
    startDate!:Date;
    endDate!:Date;
    employmentName!: String;
    images!: String[];

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private experienceService: ExperienceService,
        private uploadService: UploadService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.isLoggedIn = this.authService.isLoggedIn();

        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;

        this.company = this.experience.company;
        this.description = this.experience.description;
        this.startDate = new Date(this.experience.startDate);
        this.endDate = new Date(this.experience.endDate);
        this.employmentName = this.experience.employment.name;
    }

    createImgeFromBlob(image: Blob) {
        const reader = new FileReader();

        reader.onload = () => {
            this.images.push(reader.result as string);
        }

        if (image) {
            if (image.type !== "image/*") {
                reader.readAsDataURL(image);
            }
        }
        else {
            this.images.push("assets/images/nodisponible200x200.png");
        }
    }

    getImage(id: String) {
        this.uploadService.getById(id).subscribe({
            next: (data: any) => {
                this.createImgeFromBlob(data);
            },
            error: (err: ErrorMessage) => {
            }
        });
    }

    clickHandlerEdit(id: any) {
        this.modalRef = this.modalService.open(ExperienceFormComponent, this.modalOption);
        this.modalRef.componentInstance.title = "Editar Experiencia";
        this.modalRef.componentInstance.editMode = true;
        this.modalRef.componentInstance.experience = this.experience;
        this.modalRef.result.then((result: Experience) => {
            this.experienceService.update(id, result).subscribe({
                next: (data: Experience) => {
                    this.experience = data;
                },
                error: (err: ErrorMessage) => {
                }
            });
        }, (reason) => {
            console.log("Dismiss");
        });
    }

    clickHandlerDelete(id: any) {
        this.experienceService.delete(id).subscribe({
            error: (err: ErrorMessage) => {
            }
        });
    }
}