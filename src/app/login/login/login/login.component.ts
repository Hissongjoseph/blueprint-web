import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/modals/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  auth: AngularFireAuth;

  userCol: AngularFirestoreCollection<User>
  user: User

  constructor(
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      res => {
        if (res.additionalUserInfo.isNewUser) {
          this.userCol = this.afs.collection<User>('users')
          this.user = { companies: [res.user.email]}
          this.userCol.doc(res.user.uid).set(this.user)
        }
      }
    )
  }
}
