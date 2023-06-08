import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from 'src/app/interfaces/Photo';

import {
  faCircleXmark,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent {
  @Input() photo: Photo = {} as Photo;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() onIndexChange: EventEmitter<number> = new EventEmitter<number>();

  xIcon = faCircleXmark;
  rightIcon = faAngleRight;
  leftIcon = faAngleLeft;

  handleNextEvent() {
    this.onIndexChange.emit(1);
  }
  handleBackEvent() {
    this.onIndexChange.emit(-1);
  }

  handleOutsideClick(event: MouseEvent) {
    const isClickedOnImage = (event.target as HTMLElement).classList.contains(
      'image-view'
    );
    if (!isClickedOnImage) {
      this.closeModal.emit();
    }
  }
}
