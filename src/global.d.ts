import firebase from 'firebase/compat/app';

declare module '@angular/fire' {
  export interface DocumentSnapshot<T = firebase.firestore.DocumentData>
    extends firebase.firestore.DocumentSnapshot<T> {}

  export interface QueryDocumentSnapshot<T = firebase.firestore.DocumentData>
    extends firebase.firestore.QueryDocumentSnapshot<T> {}

  export interface QuerySnapshot<T = firebase.firestore.DocumentData>
    extends firebase.firestore.QuerySnapshot<T> {}

  export interface DocumentChange<T = firebase.firestore.DocumentData>
    extends firebase.firestore.DocumentChange<T> {
    readonly doc: QueryDocumentSnapshot<T>;
  }
}
