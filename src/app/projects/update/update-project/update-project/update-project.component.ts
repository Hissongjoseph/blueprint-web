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
  boardName: string;
  selectedBoard: any;
  selectedProject: any;
  projectDetails: any;
  selectedProjectDetails: any;
  totalHours: number;
  addedHours: number;
  totalMaterials: number;
  addedMaterials: number;

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
    this.boardName = localStorage.getItem('board');

    this.updateForm = this.formBuilder.group({
      board: [this.boardName],
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
    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getAllProjectDetails(this.currentUserUID, this.boardName)
    .then(
      result => {
        this.projectDetails = result;
    }
  );
  }

  get form() {
    return this.updateForm.controls;
  }

  onProjectChange(event: any) {
    this.selectedProject = event.target.value;
    this.firebaseService.getProjectDetailsByProjectName(this.currentUserUID, this.boardName, this.selectedProject)
      .then(
        result => {
          this.selectedProjectDetails = result;
      }
    );
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.totalHours = Number(this.selectedProjectDetails.hoursUsed);
      this.addedHours = Number(this.updateForm.controls['hoursUsed'].value);

      this.totalMaterials = Number(this.selectedProjectDetails.materialsUsed);
      this.addedMaterials = Number(this.updateForm.controls['materialsUsed'].value);

      this.updateForm.controls['hoursUsed'].setValue(this.addedHours + this.totalHours);
      this.updateForm.controls['materialsUsed'].setValue(this.addedMaterials + this.totalMaterials);

      this.firebaseService.updateProject(this.boardName, this.updateForm.value).then(
        res => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
