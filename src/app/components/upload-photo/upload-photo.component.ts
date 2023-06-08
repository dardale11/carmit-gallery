import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo } from 'src/app/interfaces/Photo';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
})
export class UploadPhotoComponent implements OnInit {
  @Input() file: NgxFileDropEntry = {} as NgxFileDropEntry;
  @Output() removeFile: EventEmitter<string> = new EventEmitter<string>();
  imageUrl: string | ArrayBuffer | null = '';
  form = this._formBuilder.group({
    title: ['כותרת ליצירה', Validators.required],
    description: ['תיאור ליצירה', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const reader = new FileReader();
    const fileEntry = this.file.fileEntry as FileSystemFileEntry;
    fileEntry.file((file) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(reader.result);
      };
    });
  }

  get isImage(): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!this.file.fileEntry.isFile) {
      return false;
    }

    const fileName = this.file.fileEntry.name.toLowerCase();
    const fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);

    return imageExtensions.includes(fileExtension);
  }

  onRemoveFile() {
    console.log('on remove file', this.file.relativePath);
    this.removeFile.emit(this.file.relativePath);
  }

  getDetails() {
    console.log('in get details');
    if (this.form.valid) {
      console.log('in if');

      const title = this.form.get('title')!.value;
      const description = this.form.get('description')!.value;

      return {
        title: title,
        description: description,
        imageUrl:
          'https://via.placeholder.com/300x200?text=Image+Not+Available',
        uploadDate: Timestamp.now(),
        misc: '{}',
      };
    } else {
      console.log('in else');

      return undefined;
    }
  }
}
