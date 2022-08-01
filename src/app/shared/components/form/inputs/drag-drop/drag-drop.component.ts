import { Component } from '@angular/core';

@Component({
  selector: 'input-drop-file',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragAndDropComponent {
  allFiles: File[] = [];

  constructor() { }

  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }
}
