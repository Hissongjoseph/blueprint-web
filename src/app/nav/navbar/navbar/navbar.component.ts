import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  auth: AngularFireAuth

  constructor() { }

  ngOnInit(): void {
    console.log(this.auth)
  }

  logout() {
    this.auth.auth.signOut();
  }
}
