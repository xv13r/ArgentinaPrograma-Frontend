import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})

export class InputFilesComponent {
  faCamera = faCamera;
  selectedFiles?: FileList;
  @Input() images: String[] = [];
  @Input() ngClass!: any;
  
  @Output() imagesChange = new EventEmitter();

  constructor() {}

  onFileChangeDelete(index: number){
    if (index > -1) {
      this.images.splice(index, 1);
    }
    console.log(index);
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    this.images = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    this.imagesChange.emit(this.images);
  }
}