import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'card-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  providers: [NgbPopoverConfig]
})
export class CardProgressComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() skill!: any;
  @Output() btnClickEdit = new EventEmitter();
  @Output() btnClickDelete = new EventEmitter();
  
  clickHandlerEdit() {
    this.btnClickEdit.emit();
  }
  
  clickHandlerDelete () {
    this.btnClickDelete.emit();
  }

  constructor(config: NgbPopoverConfig) {
    config.placement = 'top';
    config.triggers = 'hover';
  }
}