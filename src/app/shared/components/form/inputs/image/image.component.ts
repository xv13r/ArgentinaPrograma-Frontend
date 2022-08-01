import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class InputImageComponent implements OnInit {
  @Input() multiple:boolean = false;
  @Input() images:String[] | null = null;
  
  @Output() previews: String[] = [];
  typeButton: 'create'|'edit' = 'create';

  @Output() imageChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");
    if (this.images !== null) {
      // this.imagesToPreview(this.images);
    }
    else{
      this.images = new Array<String>();
    }
  }

  refresh(): void {
    window.location.reload();
}
/*
    const reader = new FileReader();

     if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.typeButton = 'edit';
      }
      this.fileToUpload = e.target.files;
      this.imageChange.emit(e.target.files);
    }
*/

  // imagesToPreview(images: any){
  //     images.forEach(file => {
  //       this.previews.push(file);
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = _event => {
        //   this.previews.push(reader.result);
        // };
  //     });
  //     console.log(this.previews);
  // }

  onFileChange(fileInput: any) {
    const reader = new FileReader();

    for (var i = 0; i < fileInput.target.files.length; i++) {
      reader.readAsDataURL(fileInput.target.files[i]);
      reader.onload = _event => {
        this.previews.push(reader.result as string);
        console.table("Preview: " + this.previews);
      };
    }
    

    // if (fileInput.target.files && fileInput.target.files.length){
    //   this.imagesToPreview(fileInput.target.files);
    // }
    this.imageChange.emit(this.previews);
    // if ((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg')){
  }
}