import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Proyect } from 'src/app/core/models/proyect.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProyectService } from 'src/app/core/services/proyect.service';
import { UploadService } from 'src/app/core/services/file.service';
import { ProyectFormComponent } from '../proyect-form/proyect-form.component';

@Component({
    selector: 'proyect-item',
    templateUrl: './proyect-item.component.html',
    styleUrls: ['./proyect-item.component.scss']
})

export class ProyectItemComponent implements OnInit {
    isLoggedIn: boolean = false;
    @Input() proyect!: Proyect;

    private modalRef!: NgbModalRef;
    private modalOption: NgbModalOptions = {};
           
    name!:String;
    description!:String;
    link!:String;
    created!:Date;
    images!: String[];

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private proyectService: ProyectService,
        private uploadService: UploadService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.isLoggedIn = this.authService.isLoggedIn();

        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;

        this.name = this.proyect.name;
        this.description = this.proyect.description;
        this.link = this.proyect.link;
        this.created = new Date(this.proyect.created);
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
        this.modalRef = this.modalService.open(ProyectFormComponent, this.modalOption);
        this.modalRef.componentInstance.title = "Editar Proyecto";
        this.modalRef.componentInstance.editMode = true;
        this.modalRef.componentInstance.proyect = this.proyect;
        this.modalRef.result.then((result: Proyect) => {
            this.proyectService.update(id, result).subscribe({
                next: (data: Proyect) => {
                    this.proyect = data;
                },
                error: (err: ErrorMessage) => {
                }
            });
        }, (reason) => {
            console.log("Dismiss");
        });
    }

    clickHandlerDelete(id: any) {
        this.proyectService.delete(id).subscribe({
            error: (err: ErrorMessage) => {
            }
        });
    }
}