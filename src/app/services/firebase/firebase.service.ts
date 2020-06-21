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

  getBoardNames(userId: string) {
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

  getAllProjectDetails(userId: string, boardName: string) {
    return new Promise<any>((resolve, reject) => {
        this.afs.collection('companies/' + boardName + '/projects').valueChanges()
        .subscribe(
          snapshots => {
            resolve(snapshots);
          }
        );
      }
    );
  }

  getProjectDetailsByProjectName(userId: string, boardName: string, projectName: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('companies/' + boardName + '/projects').doc(projectName).valueChanges()
      .subscribe(
        snapshots => {
          resolve(snapshots);
        }
      );
    }
  );
  }

  createProject(boardName: string, project: Project) {
    return this.afs.collection('companies/' + boardName + '/projects').doc(project.name).set(project);
  }

  updateProject(boardName: string, project: Project) {
    return this.afs.collection('companies/' + boardName + '/projects').doc(project.name).update(project);
  }
}
