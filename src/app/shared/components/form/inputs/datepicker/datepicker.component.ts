import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerServiceInputs } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';

@Component({
  selector: 'input-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class InputDatePickerComponent implements OnInit {
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() className: String = 'form-control';
  @Input() ngClass!: any;
  @Input() dateValue!: Date | null;
  currentDate!: any;
  @Output() dateChange = new EventEmitter();

  faCalendar = faCalendar;

  constructor() { }

  onChange(date: Date) {
    this.dateChange.emit(date);
  }

  ngOnInit(): void {

    console.log("datepicker:" + this.dateValue?.toUTCString());
    if (this.dateValue !== null){
      this.currentDate = { year: this.dateValue.getFullYear(), month: this.dateValue.getMonth() + 1, day: this.dateValue.getDate() };
   }

    if (this.isDate(this.minDate)) {
      const utcDate = new Date().toUTCString();
      this.minDate = new Date(utcDate);
    }

    if (this.isDate(this.maxDate)) {
      const utcDate = new Date().toUTCString();
      this.maxDate = new Date(utcDate);
    }
  }

  isDate(date: any) {
    if (date !== null && date !== undefined)
      return ((new Date(date) instanceof Date) && !isNaN(date));
    return false;
  }
}