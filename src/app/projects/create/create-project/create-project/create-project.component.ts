import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/modals/project/project.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  currentUserUID: string;
  createForm: FormGroup;
  project: Project;
  projectNames: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      project: ['', Validators.required],
      id: [, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
      name: ['', Validators.required],
      hoursAllocated: [, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
      materialsAllocated: [, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
      materialsUsed: [ , [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
      hoursUsed: [ , [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
      ]],
    });

    this.projectNames = [];
    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getBoardNames(this.currentUserUID)
      .then(result => {
        this.projectNames = result;
      }
    );
  }

  get form() {
    return this.createForm.controls;
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.firebaseService.createProject(this.createForm.controls['project'].value, this.createForm.value).then(
        res => {
          this.router.navigate(['/']);
        }
      );
    }
  }

}
