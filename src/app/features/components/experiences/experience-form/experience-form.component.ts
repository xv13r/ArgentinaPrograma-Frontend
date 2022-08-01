import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employment } from 'src/app/core/models/employment.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Experience } from 'src/app/core/models/experience.model';
import { EmploymentService } from 'src/app/core/services/employment.service';
import { UploadService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})

export class ExperienceFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!: String;

  @Input() experience!: Experience;
  @Input() title!: String;
  @Input() editMode: boolean = false;
  employments!: Employment[];
  image!: String;
  selectedItem?:String;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private uploadService: UploadService,
    private employmentService: EmploymentService) {
  }

  ngOnInit(): void {
    this.getEmployments();
    this.createForm();
  }

  getEmployments() {
    this.employmentService.getAll().subscribe({
      next: (data: Employment[]) => {
        this.employments = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      company: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(48), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      employment: new FormControl(''),
      images: new FormControl('')
    });

    if (this.editMode) {
      this.form.controls['company'].setValue(this.experience.company);
      this.form.controls['description'].setValue(this.experience.description);
      this.form.controls['startDate'].setValue(this.experience.startDate);
      this.form.controls['endDate'].setValue(this.experience.endDate);
      this.form.controls['employment'].setValue(this.experience.employment);
      this.form.controls['images'].setValue(this.experience.imagesId);
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

  onSelectChange(item: String) {
    console.log(item);
    this.form.controls['employment'].setValue(item);
  }

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    const { company, description, startDate, endDate, employment, image } = this.form.value;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let experience = new Experience();
    experience.company = company;
    experience.description = description;
    experience.startDate = startDate;
    experience.endDate = endDate;
    experience.employment = employment;
    experience.employment = this.employments.find(c => employment == c.id) as Employment;
    let array = new Array<String>();
    array.push(image);
    experience.imagesId = array;

    this.activeModal.close(experience);
  }

  get companyForm() {
    return this.form.get('company');
  }

  get descriptionForm() {
    return this.form.get('description');
  }

  get startDateForm() {
    return this.form.get('startDate');
  }

  get endDateForm() {
    return this.form.get('endDate');
  }

  get employmentForm() {
    return this.form.get('employment');
  }

  get imagesForm() {
    return this.form.get('images');
  }
}