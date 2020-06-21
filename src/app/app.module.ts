import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './nav/navbar/navbar/navbar.component';
import { LoginComponent } from './login/login/login/login.component';
import { CreateProjectComponent } from './create/create-project/create-project/create-project.component';
import { CurrentProjectsComponent } from './current/current-projects/current-projects/current-projects.component';
import { UpdateProjectComponent } from './update/update-project/update-project/update-project.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UpdateBoardComponent } from './boards/update-board/update-board/update-board.component';
import { BoardsComponent } from './boards/boards/boards/boards.component';
import { ManageBoardsComponent } from './boards/manage-boards/manage-boards/manage-boards.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CreateProjectComponent,
    CurrentProjectsComponent,
    UpdateProjectComponent,
    UpdateBoardComponent,
    BoardsComponent,
    ManageBoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
