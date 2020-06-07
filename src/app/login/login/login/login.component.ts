import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  auth: AngularFireAuth

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
}
