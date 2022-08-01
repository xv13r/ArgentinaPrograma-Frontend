import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class CardTitleComponent {
  @Input() title!:String;

  constructor() { }
}
