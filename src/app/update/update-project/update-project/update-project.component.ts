import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  project: any
  updateForm: FormGroup;
  isDataLoaded: boolean;
  isProject: boolean

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.isProject = false
    this.isDataLoaded = false;

    this.updateForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      materialsUsed: ['', Validators.required],
      hoursUsed: ['', Validators.required]
    });

  }

  get form() {
    return this.updateForm.controls;
  }

  onSelect(project: any) {
  }

  onSubmit() {
  }
}
