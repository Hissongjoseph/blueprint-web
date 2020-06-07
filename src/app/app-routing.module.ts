import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create/create-project/create-project/create-project.component';
import { CurrentProjectsComponent } from './current/current-projects/current-projects/current-projects.component';
import { UpdateProjectComponent } from './update/update-project/update-project/update-project.component';


const routes: Routes = [
  { path: '', component: CurrentProjectsComponent},
  { path: 'create', component: CreateProjectComponent},
  { path: 'update', component: UpdateProjectComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
