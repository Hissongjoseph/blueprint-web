import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuth } from '@angular/fire';
import { Project } from 'src/app/modals/project/project.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  validated: boolean;

  constructor(
    private afs: AngularFirestore
  ) {}

  getProjectNames(userId: string) {
    return new Promise<any>((resolve, reject) => {
        this.afs.doc('users/' + userId).valueChanges()
        .subscribe(
          snapshots => {
            resolve(snapshots);
          }
        );
      }
    );
  }

  getProjectDetails(userId: string, projectName: string) {
    this.validated = false;

    return new Promise<any>((resolve, reject) => {
        this.afs.collection('companies/' + projectName + '/projects').valueChanges()
        .subscribe(
          snapshots => {
            resolve(snapshots);
          }
        );
      }
    );
  }

  createProject(projectName: string, project: Project) {
    return this.afs.collection('companies/' + projectName + '/projects').add(project);
  }
}
