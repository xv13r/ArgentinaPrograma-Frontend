import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Category } from 'src/app/core/models/category.model';
import { Education } from 'src/app/core/models/education.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { EducationService } from 'src/app/core/services/education.service';
import { UploadService } from 'src/app/core/services/file.service';
import { EducationFormComponent } from '../education-form/education-form.component';

@Component({
    selector: 'education-item',
    templateUrl: './education-item.component.html',
    styleUrls: ['./education-item.component.scss']
})

export class EducationItemComponent implements OnInit {
    isLoggedIn: boolean = false;
    @Input() education!: Education;

    private categories!: Category[];
    private modalRef!: NgbModalRef;
    private modalOption: NgbModalOptions = {};
           
    school!:String;
    career!:String;
    startDate!:Date;
    endDate!:Date;
    categoryName!: String;
    images!: String[];

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private educationService: EducationService,
        private categoryService: CategoryService,
        private uploadService: UploadService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.isLoggedIn = this.authService.isLoggedIn();

        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;

        this.school = this.education.school;
        this.career = this.education.career;
        this.startDate = new Date(this.education.startDate);
        this.endDate = new Date(this.education.endDate);
        this.categoryName = this.education.category.name;
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
        this.modalRef = this.modalService.open(EducationFormComponent, this.modalOption);
        this.modalRef.componentInstance.title = "Editar Educación";
        this.modalRef.componentInstance.editMode = true;
        this.modalRef.componentInstance.education = this.education;
        this.modalRef.result.then((result: Education) => {
            this.educationService.update(id, result).subscribe({
                next: (data: Education) => {
                    this.education = data;
                },
                error: (err: ErrorMessage) => {
                }
            });
        }, (reason) => {
            console.log("Dismiss");
        });
    }

    clickHandlerDelete(id: any) {
        this.educationService.delete(id).subscribe({
            error: (err: ErrorMessage) => {
            }
        });
    }
}