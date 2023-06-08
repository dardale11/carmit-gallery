import { Injectable } from '@angular/core';

import { Photo } from '../interfaces/Photo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  constructor(private firestore: AngularFirestore) {}

  getAllPhotosFromFirestore(): Observable<Photo[]> {
    const photosCollection = this.firestore.collection<Photo>('photos');
    return photosCollection.valueChanges();
  }

  uploadPhotoObjToFirestore(photoObj: Photo) {
    console.log('in upload to firestore...');
    console.log('photo obj:', photoObj);
    console.log('trying to reach fire base');
    const collection = this.firestore.collection('photos');
    console.log('got collection');
    console.log('collection', collection);
    console.log('trying to add ...');
    collection
      .add(photoObj)
      .then(() => {
        console.log('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
    console.log('end of function');
  }
}
