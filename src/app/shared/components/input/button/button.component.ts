import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faExclamation, faPencil, faPlus, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class InputButtonComponent {
  private className!:String;
  private iconName!:IconDefinition;
  
  @Input() isDisabled:boolean = false;
  @Input() isLoggedIn:boolean = false;
  @Output() btnClick = new EventEmitter();

	@Input()
	set name(type: String) {
		type = type.toLowerCase();

    switch(type){
      case "create": 
        this.className = "btn create";
        this.iconName = faPlus;
        break;
      case "edit":
        this.className = "btn edit";
        this.iconName = faPencil;
        break;
      case "delete":
        this.className = "btn delete";
        this.iconName = faTrash;
        break;
      default:
        this.className = "btn fail";
        this.iconName = faExclamation;
        break;
    }
	}

  get icon():IconDefinition{
    return this.iconName;
  }

  get class():String{
    return this.className;
  }


  constructor() { }

	onClick() {
		this.btnClick.emit();
	}
}