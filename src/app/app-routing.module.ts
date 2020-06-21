import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { BoardsComponent } from './boards/boards/boards/boards.component';
import { CurrentProjectsComponent } from './projects/current/current-projects/current-projects/current-projects.component';
import { CreateProjectComponent } from './projects/create/create-project/create-project/create-project.component';
import { UpdateProjectComponent } from './projects/update/update-project/update-project/update-project.component';

const routes: Routes = [
  { path: '', component: CurrentProjectsComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'create', component: CreateProjectComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'update', component: UpdateProjectComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'boards', component: BoardsComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
