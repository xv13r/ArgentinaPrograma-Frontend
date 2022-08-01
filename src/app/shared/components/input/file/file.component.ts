import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadService } from 'src/app/core/services/file.service';

@Component({
  selector: 'input-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})

export class InputFileComponent {
  fileToUpload!: FileList;
  multiple: boolean = false;
  @Input() image: String | null = null;
  typeButton: 'create'|'edit' = 'create';

  @Output() imageChange = new EventEmitter();

  onFileChange(e:any) {
    const reader = new FileReader();

     if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result as string;
        this.typeButton = 'edit';
      }
      this.fileToUpload = e.target.files;
      this.imageChange.emit(e.target.files);
    }
  }

  constructor() { }
}