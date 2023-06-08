import { Component } from '@angular/core';
import { Photo } from 'src/app/interfaces/Photo';
import { Timestamp } from 'firebase/firestore';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  photos: Photo[] = [];
  colsNum: number = 12;
  photoView: Photo | undefined;
  photoViewIndex: number | undefined;

  constructor(private firestoreService: FireStoreService) {
    firestoreService
      .getAllPhotosFromFirestore()
      .subscribe((photos) => (this.photos = photos));
    // this.photos = [
    //   {
    //     title: 'la fifa',
    //     description: 'city in the evening',
    //     imageUrl: 'assets/1.jpeg',
    //     uploadDate: Timestamp.now(),
    //     misc: '{}',
    //   },
    //   {
    //     title: 'la fifa',
    //     description: 'city in the evening',
    //     imageUrl: 'assets/2.jpeg',
    //     uploadDate: Timestamp.now(),
    //     misc: '{}',
    //   },
    //   {
    //     title: 'la fifa',
    //     description: 'city in the evening',
    //     imageUrl: 'assets/3.jpeg',
    //     uploadDate: Timestamp.now(),
    //     misc: '{}',
    //   },
    //   {
    //     title: 'la fifa',
    //     description: 'city in the evening',
    //     imageUrl: 'assets/4.jpeg',
    //     uploadDate: Timestamp.now(),
    //     misc: '{}',
    //   },
    // ];
  }

  handleIndexChange(diff: number) {
    const updatedIndex =
      this.photoViewIndex === undefined ? 0 : this.photoViewIndex + diff;
    if (updatedIndex == -1) {
      this.handlePhotoClick(this.photos.length - 1);
    } else if (updatedIndex == this.photos.length) {
      this.handlePhotoClick(0);
    } else {
      this.handlePhotoClick(updatedIndex);
    }
  }

  handlePhotoClick(index: number) {
    this.photoViewIndex = index;
    this.photoView = this.photos[index];
  }

  handleCloseModal() {
    this.photoView = undefined;
  }
}
