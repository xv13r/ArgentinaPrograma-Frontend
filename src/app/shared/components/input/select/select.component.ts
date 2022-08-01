import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class InputSelectComponent {
  @Input() items: any[] = [];
  @Input() selectedItem!: any | null;
  @Input() className: String = 'form-control';
  @Input() ngClass!:any;
  @Output() selectChange = new EventEmitter();

  constructor() { }

  onChange(item: String) {
    this.selectChange.emit(item);
  }

  compareOption(item1: String, item2: String) {
    return item1 === item2;
  }
}