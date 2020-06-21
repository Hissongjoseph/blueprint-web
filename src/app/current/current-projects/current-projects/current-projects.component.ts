import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
@Component({
  selector: 'app-current-projects',
  templateUrl: './current-projects.component.html',
  styleUrls: ['./current-projects.component.css']
})
export class CurrentProjectsComponent implements OnInit{

  currentUserUID: string;

  projectNames: Array<any>;
  projectDetails: Array<any>;
  selectedProject!: string;

  constructor(
    public auth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.projectNames = [];
    this.selectedProject = '';

    this.currentUserUID = this.auth.auth.currentUser.uid;

    this.firebaseService.getProjectNames(this.currentUserUID)
      .then(result => {
        this.projectNames = result;
      }
    );
  }

  onChange(event: any) {
    this.selectedProject = event.target.value;
    this.firebaseService.getProjectDetails(this.currentUserUID, this.selectedProject)
      .then(
        result => {
          this.projectDetails = result;
      }
    );
  }
}
