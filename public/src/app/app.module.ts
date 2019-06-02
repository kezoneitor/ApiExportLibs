import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';

import { LingsService } from './services/lings.service';
import { LogModalComponent } from './gallery/log-modal/log-modal.component';

const firebaseConfig = {
  apiKey: "AIzaSyB-IiIGOS8F2Q1DzNbMvGr61Z15wa-dYps",
  authDomain: "webfingerlings.firebaseapp.com",
  databaseURL: "https://webfingerlings.firebaseio.com",
  projectId: "webfingerlings",
  storageBucket: "webfingerlings.appspot.com",
  messagingSenderId: "346642686602",
  appId: "1:346642686602:web:83ce94f35914fcf1"
};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    GalleryComponent,
    LogModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    CodemirrorModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    LingsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LogModalComponent]
})
export class AppModule { }
