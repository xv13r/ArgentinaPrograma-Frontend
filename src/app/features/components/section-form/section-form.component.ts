import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})

export class SectionFormComponent{
  @Input() title!: String;
  @Input() sections!: any;

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  }

ngOnInit():void{
  this.form = this.formBuilder.group({
    experiences: this.sections['experiences'],
    educations: this.sections.educations,
    skills: this.sections.skills,
    proyects: this.sections.proyects
  });
}

  closeMe() {
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.activeModal.close(this.form.value);
  }
}