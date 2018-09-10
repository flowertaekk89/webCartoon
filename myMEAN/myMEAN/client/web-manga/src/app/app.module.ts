import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';
import { UserInfoUpdateModalComponent } from './user-info-update-modal/user-info-update-modal.component';
import { MangaComponent } from './manga/manga.component';
import { UploadMangaComponent } from './upload-manga/upload-manga.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    SignUpModalComponent,
    UserInfoUpdateModalComponent,
    MangaComponent,
    UploadMangaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [
      NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
