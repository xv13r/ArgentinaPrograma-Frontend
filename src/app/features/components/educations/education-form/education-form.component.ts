import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/core/models/category.model';
import { Education } from 'src/app/core/models/education.model';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { CategoryService } from 'src/app/core/services/category.service';
import { UploadService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})

export class EducationFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!: String;

  @Input() education!: Education;
  @Input() title!: String;
  @Input() editMode: boolean = false;
  categories!: Category[];
  image!: String;
  selectedItem?:String;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private uploadService: UploadService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      school: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      career: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(48), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      category: new FormControl(''),
      images: new FormControl('')
    });

    if (this.editMode) {
      this.form.controls['school'].setValue(this.education.school);
      this.form.controls['career'].setValue(this.education.career);
      this.form.controls['startDate'].setValue(this.education.startDate);
      this.form.controls['endDate'].setValue(this.education.endDate);
      this.form.controls['category'].setValue(this.education.category);
      this.form.controls['images'].setValue(this.education.imagesId);
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
    this.form.controls['category'].setValue(item);
  }

  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    const { school, career, startDate, endDate, category, image } = this.form.value;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let education = new Education();
    education.school = school;
    education.career = career;
    education.startDate = startDate;
    education.endDate = endDate;
    education.category = category;
    education.category = this.categories.find(c => category == c.id) as Category;
    let array = new Array<String>();
    array.push(image);
    education.imagesId = array;

    this.activeModal.close(education);
  }

  get schoolForm() {
    return this.form.get('school');
  }

  get careerForm() {
    return this.form.get('career');
  }

  get startDateForm() {
    return this.form.get('startDate');
  }

  get endDateForm() {
    return this.form.get('endDate');
  }

  get categoryForm() {
    return this.form.get('category');
  }

  get imagesForm() {
    return this.form.get('images');
  }
}