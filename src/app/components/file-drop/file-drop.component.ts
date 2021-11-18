import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {
  fileOver: boolean;
  files: any[] = [];

  constructor() {
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;

    if (event?.dataTransfer?.files) {
      console.log(event.dataTransfer.files, ' --- transfer ');
      this.files.push(event.dataTransfer.files);
    } else {
      console.log(event.target.files, '--target');
      this.files.push(event.target.files);
    }

    console.log(this.files)

    if (this.files) {
      // console.log(event.target.files);
      // const formData = new FormData();
      // formData.append('', file);
      // this.projects.uploadGcodeFile(formData);
    }
  }

  ngOnInit(): void {
  }

}
