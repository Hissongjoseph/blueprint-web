import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuth } from '@angular/fire';
import { Project } from 'src/app/modals/project/project.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  validated: boolean;

  constructor(
    private afs: AngularFirestore
  ) { }

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

  getUsersOnBoard(boardName: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs.doc('companies/' + boardName).valueChanges()
        .subscribe(
          snapshots => {
            resolve(snapshots);
          }
        );
    }
    );
  }

  addUserToBoard(boardName: string, users: string) {
    return this.afs.collection('companies/').doc(boardName).update(users);
  }

  addBoardToUser(boardName: string, userEmail: string) {
    return this.afs.collection('users/').doc(userEmail).update({companies: firebase.firestore.FieldValue.arrayUnion(boardName)});
  }

  createInitBoard(userEmail: string) {
    return this.afs.collection('companies/').doc(userEmail).set({users:  firebase.firestore.FieldValue.arrayUnion(userEmail)});
  }
}
