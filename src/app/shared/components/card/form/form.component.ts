import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'card-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class CardFormComponent {
  @Input() title!:String;

  constructor(
    public activeModal: NgbActiveModal) {}
}
