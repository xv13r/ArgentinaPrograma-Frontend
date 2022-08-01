import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/core/models/skill.model';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})

export class SkillFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  isSignUpFailed = false;
  errorMessage!: String;
  rangeValue:Number = 0;

  @Input() skill!: Skill;
  @Input() title!: String;
  @Input() editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(48), Validators.pattern("[a-záéíóúñA-ZÁÉÍÓÚÑ0-9\\s]*")]),
      progress: new FormControl(''),
    });

    if (this.editMode) {
      this.form.controls['name'].setValue(this.skill.name);
      this.form.controls['description'].setValue(this.skill.description);
      this.form.controls['progress'].setValue(this.skill.progress);
      this.rangeValue = this.skill.progress;
    }
  }


  closeMe() {
    console.log("Close");
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    const { name, description, progress } = this.form.value;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let skill = new Skill();
    skill.name = name;
    skill.description = description;
    skill.progress = progress;

    this.activeModal.close(skill);
  }

  get nameForm() {
    return this.form.get('name');
  }

  get descriptionForm() {
    return this.form.get('description');
  }

  get progressForm() {
    return this.form.get('progress');
  }
}