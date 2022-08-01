import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-epoch',
  templateUrl: './epoch.component.html',
  styleUrls: ['./epoch.component.scss']
})
export class CardEpochComponent {
  private dateStart!:Date;
  private dateEnd!:Date;

  @Input() 
	set startDate(value: Date) {
		this.dateStart = value;
  }

  get startDate(): Date {
    return this.dateStart
  }

  @Input() 
	set endDate(value: Date) {
		this.dateEnd = value;
  }

  get endDate(): Date {
    return this.dateEnd;
  }

  get diffDate():String{
    return "";
  }

  getDateDiff(startDate:Date, endDate:Date):String {
    if (!endDate){
      endDate = new Date();
    }

    if (startDate > endDate) {
      let swap = startDate;
      startDate = endDate;
      endDate = swap;
    }

    let yearDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthDiff = endDate.getMonth() - startDate.getMonth();

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    const yearText = yearDiff != 0 ? (yearDiff + ' año' + (yearDiff == 1 ? ' ' : 's ')) : "";
    const monthText = monthDiff != 0 ? (monthDiff + ' mes' + (monthDiff == 1 ? '' : 'es')) : "";

    // Años y meses
    const diff = yearDiff + monthDiff;
    return diff ? "("+ yearText + monthText + ")" : "(Menos de un més)";
  }

  constructor() { }
}
