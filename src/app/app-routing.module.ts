import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create/create-project/create-project/create-project.component';
import { CurrentProjectsComponent } from './current/current-projects/current-projects/current-projects.component';
import { UpdateProjectComponent } from './update/update-project/update-project/update-project.component';
import { AppComponent } from './app.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: 'current', component: CurrentProjectsComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'create', component: CreateProjectComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'update', component: UpdateProjectComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
