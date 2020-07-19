import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  auth: AngularFireAuth;

  userCol: AngularFirestoreCollection<User>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      res => {
        if (res.additionalUserInfo.isNewUser) {
          this.userCol = this.afs.collection<User>('users');
          this.user = { companies: [res.user.email]};
          this.userCol.doc(res.user.email).set(this.user);
          this.firebaseService.createInitBoard(res.user.email);
        }
        this.router.navigate(['/']);
      }
    );
  }
}
