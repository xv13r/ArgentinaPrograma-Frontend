import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'card-item',
  templateUrl: './item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./item.component.scss'],
})

export class CardItemComponent {
  @Input() images!:String[];
  @Input() title!: String;
  @Input() description!:String;
  @Input() isLoggedIn: boolean = false;
  @Input() size:"full"|"item" = "full";

  @Output() btnClickEdit = new EventEmitter();
  @Output() btnClickDelete = new EventEmitter();

  clickHandlerEdit() {
    this.btnClickEdit.emit();
  }

  clickHandlerDelete() {
    const modalRef = this.modalService.open(CardConfirmComponent);
    modalRef.result.then((result) => {
      this.btnClickDelete.emit();
    }, (reason) => {
      // this.closeResult = reason;
    });
  }

  constructor(private modalService: NgbModal) {
  }
}