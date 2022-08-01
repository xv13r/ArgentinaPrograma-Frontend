import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class InputTextComponent {
    @Input() label = "";
    @Input() control!: FormControl;
    @Input() placeholder?: string;
    @Input() submitted?: boolean;
}
