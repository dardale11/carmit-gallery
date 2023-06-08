import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'upload',
    component: UploaderComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/gallery' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
