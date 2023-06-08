import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {
  constructor(private fireStorage: AngularFireStorage) {}

  uploadFileToFireStorage(fileObj: File) {
    const filePath = fileObj.name;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, fileObj);

    // Progress monitoring
    task.percentageChanges().subscribe((percentage) => {
      console.log(`Upload is ${percentage}% complete`);
    });

    // Get download URL once the upload is complete
    return task.snapshotChanges().pipe(
      switchMap((snapshot) => {
        if (snapshot!.state === 'success') {
          return fileRef.getDownloadURL();
        } else {
          // Return an empty Observable if the status is not 'success'
          return new Observable<string>();
        }
      })
    );
  }
}
