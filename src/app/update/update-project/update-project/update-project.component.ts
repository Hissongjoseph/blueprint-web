import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  currentUserUID: string;
  project: any;
  updateForm: FormGroup;
  isDataLoaded: boolean;
  isProject: boolean;
  projectNames: Array<any>;
  selectedBoard: any;
  selectedProject: any;
  projectDetails: any;
  selectedProjectDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.selectedProjectDetails = [];
    this.isProject = false;
    this.isDataLoaded = false;

    this.updateForm = this.formBuilder.group({
      board: [''],
      name: ['', Validators.required],
      materialsUsed: [, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
      hoursUsed: [, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]]
    });

    this.projectNames = [];
    this.currentUserUID = this.auth.auth.currentUser.uid;

    this.firebaseService.getBoardNames(this.currentUserUID)
      .then(result => {
        this.projectNames = result;
      }
    );
  }

  get form() {
    return this.updateForm.controls;
  }

  onChange(event: any) {
    this.selectedBoard = event.target.value;
    this.firebaseService.getAllProjectDetails(this.currentUserUID, this.selectedBoard)
      .then(
        result => {
          this.projectDetails = result;
      }
    );
  }

  onProjectChange(event: any) {
    this.selectedProject = event.target.value;
    this.firebaseService.getProjectDetailsByProjectName(this.currentUserUID, this.selectedBoard, this.selectedProject)
      .then(
        result => {
          this.selectedProjectDetails = result;
      }
    );
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.firebaseService.updateProject(this.selectedBoard, this.updateForm.value).then(
        res => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
