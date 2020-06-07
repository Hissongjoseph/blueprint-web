import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      hoursAllocated: ['', Validators.required],
      materialsAllocated: ['', Validators.required]
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSubmit() {
  }

}
