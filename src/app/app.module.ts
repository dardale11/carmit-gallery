import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxFileDropModule } from 'ngx-file-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';

import { provideStorage, getStorage } from '@angular/fire/storage';
import { IntroComponent } from './components/intro/intro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: 'AIzaSyA0jgqWqZSmW_pBk8m7FC4uOQ2FKAzLycQ',
//   authDomain: 'carmit-gallery.firebaseapp.com',
//   projectId: 'carmit-gallery',
//   storageBucket: 'carmit-gallery.appspot.com',
//   messagingSenderId: '1059250744628',
//   appId: '1:1059250744628:web:dcdd36f0606f5185738961',
//   measurementId: 'G-28W6GMBXHX',
// };

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    NavBarComponent,
    UploaderComponent,
    UploadPhotoComponent,
    IntroComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    NgxFileDropModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    //
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    //
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
