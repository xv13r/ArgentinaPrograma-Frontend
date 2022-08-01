import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';

import { Proyect } from 'src/app/core/models/proyect.model';
import { AuthService } from 'src/app/core/services/auth.service';

import { ProyectService } from 'src/app/core/services/proyect.service';
import { ProyectFormComponent } from './proyect-form/proyect-form.component';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})

export class ProyectsComponent implements OnInit {
  isLoggedIn: boolean = false;
  proyects!: Proyect[];

  private modalOption: NgbModalOptions = {};
  private modalRef!: NgbModalRef;

  title: String = "Proyecto";

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private proyectService: ProyectService,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.proyectService.getAllByProfileId(id).subscribe({
      next: (data: Proyect[]) => {
        this.proyects = data;

      },
      error: (err: ErrorMessage) => {

      }
    });
  }

  clickHandlerCreate() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.modalRef = this.modalService.open(ProyectFormComponent, this.modalOption);
    this.modalRef.componentInstance.title = "Crear Proyecto";
    this.modalRef.componentInstance.editMode = false;
    this.modalRef.result.then((result: Proyect) => {
      this.proyectService.createByProfileId(id, result).subscribe({
        next: (data: Proyect) => {
        },
        error: (err: ErrorMessage) => {
        }
      });
    }, (reason) => {
      console.log("Dismiss");
    });
  }
}