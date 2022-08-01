import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-argentina-programa';

  clickHandlerCreate(value: string){
    console.log("app.components Create: " + value);
  }

  clickHandlerEdit(value: string){
    console.log("app.components Edit: " + value);
  }

  clickHandlerDelete(value: string){
    console.log("app.components Delete: " + value);
  }

    // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

    images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/200/200`);


  public start:Date = new Date("12/27/1982");
  public end:Date = new Date("03/12/1993");


  constructor(private modalService: NgbModal) {}
}