import { Component, QueryList, ViewChildren } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Photo } from 'src/app/interfaces/Photo';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent {
  @ViewChildren(UploadPhotoComponent)
  childForms!: QueryList<UploadPhotoComponent>;
  files: NgxFileDropEntry[] = [];
  photoObjects: Photo[] = [];
  constructor(
    private fireStorageService: FireStorageService,
    private firestoreService: FireStoreService
  ) {}

  async handleFileUpload() {
    this.childForms.forEach((childForm) => {
      this.photoObjects.push(childForm.getDetails() as Photo);
    });
    for (let [index, file] of this.files.entries()) {
      this.uploadFile(file, index);
    }
    this.files = [];
    // this.p
  }

  async uploadFile(file: NgxFileDropEntry, index: number) {
    if (file.fileEntry.isFile) {
      const droppedFile = file.fileEntry as FileSystemFileEntry;
      droppedFile.file((file: File) => {
        this.fireStorageService.uploadFileToFireStorage(file).subscribe({
          next: (downloadURL) => {
            if (downloadURL !== undefined) {
              console.log(
                'File uploaded successfully. Download URL:',
                downloadURL
              );
              // upload to DB
              if (this.photoObjects[index]) {
                this.photoObjects[index].imageUrl = downloadURL;
                this.firestoreService.uploadPhotoObjToFirestore(
                  this.photoObjects[index]
                );
              }
            } else {
              console.log('Upload failed');
            }
          },
          error: (error) => {
            console.error('Error occurred during upload:', error);
          },
        });
      });
    }
  }

  public handleFiledrop(files: any) {
    console.log('Droppped!');
    // Is it a file?
    console.log(files);
    console.log('Droppped!');
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {});
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public handleFileOver(event: any) {
    console.log('fileOver!!!');
    console.log(event);
    console.log('fileOver!!!');
  }

  public handleFileLeave(event: any) {
    console.log('fileLeave!!!');
    console.log(event);
    console.log('fileLeave!!!');
  }

  handleRemoveFile(fileToRemovePath: string) {
    console.log('on parent remove!!!', fileToRemovePath);
    this.files = this.files.filter(
      (file) => file.relativePath != fileToRemovePath
    );
  }
}
