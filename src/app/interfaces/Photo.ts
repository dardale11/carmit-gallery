import { Timestamp } from 'firebase/firestore';

export interface Photo {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  uploadDate: Timestamp;
  misc: string;
}
