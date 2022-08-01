import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Proyect } from 'src/app/core/models/proyect.model';
import { UploadService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-proyect-form',
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.scss']
})

export class ProyectFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!: String;

  @Input() proyect!: Proyect;
  @Input() title!: String;
  @Input() editMode: boolean = false;
  images!: String;
  selectedItem?: String;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(48), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      link: new FormControl(''),
      created: new FormControl(''),
      images: new FormControl('')
    });

    if (this.editMode) {
      this.form.controls['name'].setValue(this.proyect.name);
      this.form.controls['description'].setValue(this.proyect.description);
      this.form.controls['link'].setValue(this.proyect.link);
      this.form.controls['created'].setValue(this.proyect.created);
      this.form.controls['images'].setValue(this.proyect.imagesId);
    }
  }

  onFileChange(event: any) {
    this.uploadService.upload(event.item(0)).subscribe({
      next: (data: any) => {
        this.form.controls['image'].setValue(data);
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    const { name, description, link, created, image } = this.form.value;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let proyect = new Proyect();
    proyect.name = name;
    proyect.description = description;
    proyect.link = link;
    proyect.created = created;

    let array = new Array<String>();
    array.push(image);

    proyect.imagesId = array;

    this.activeModal.close(proyect);
  }

  get nameForm() {
    return this.form.get('name');
  }

  get descriptionForm() {
    return this.form.get('description');
  }

  get linkForm() {
    return this.form.get('link');
  }

  get createdForm() {
    return this.form.get('created');
  }

  get imagesForm() {
    return this.form.get('images');
  }
}