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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from "@angular/material/stepper";

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { FunctionViewComponent } from './function-view/function-view.component';

import { LingsService } from './services/lings.service';
import { SearchLibComponent } from './search-lib/search-lib.component';
import { LogModalComponent } from './log-modal/log-modal.component';
import { InformationComponent } from './information/information.component';

const firebaseConfig = {
  apiKey: "AIzaSyCAZuZg6PIcormNxQ7wm2Td3ViXTLa3XWM",
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
    FunctionViewComponent,
    SearchLibComponent,
    LogModalComponent,
    InformationComponent,
  ],
  entryComponents: [FunctionViewComponent, LogModalComponent, InformationComponent],
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
    MatGridListModule,
    MatPaginatorModule,
    CodemirrorModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatStepperModule,
  ],
  providers: [
    LingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
