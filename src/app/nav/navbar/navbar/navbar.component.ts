import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  auth: AngularFireAuth;
  currentUserUID: string;

  projectNames: Array<any>;
  projectDetails: Array<any>;
  selectedProject!: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectNames = [];
    this.selectedProject = localStorage.getItem('board');

    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getBoardNames(this.currentUserUID)
      .then(result => {
        this.projectNames = result;
      }
    );
  }

  logout() {
    this.auth.auth.signOut();
  }

  onChange(event: any) {
    this.selectedProject = event.target.value;
    localStorage.setItem('board', this.selectedProject);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

}
