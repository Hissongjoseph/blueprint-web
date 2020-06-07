import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAuthFirebaseUIModule } from '@firebaseui/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbAuthFirebaseUIModule.forRoot({
      apiKey: "AIzaSyC3d0m8yud5FcZ4tfKsRsc5bHeBfjKsDmg",
      authDomain: "blueprint-ui.firebaseapp.com",
      databaseURL: "https://blueprint-ui.firebaseio.com",
      projectId: "blueprint-ui",
      storageBucket: "blueprint-ui.appspot.com",
      messagingSenderId: "891887076356",
      appId: "1:891887076356:web:376ff5b7b6a70ab1faa151",
      measurementId: "G-GPHJ1WM235"
       })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
