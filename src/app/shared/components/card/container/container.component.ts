import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cards-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class CardContainerComponent {
  private containerTitle!:String;
  @Input() size:"full"|"item" = "full";
	@Input()
	set title(value: String) {
		this.containerTitle = value;
  }

  @Input() isLoggedIn:boolean = false;

  get title():String{
    return this.containerTitle;
  }

  @Output() btnClickCreate = new EventEmitter();

  constructor() { }

  clickHandlerCreate () {
    this.btnClickCreate.emit();
  }
}