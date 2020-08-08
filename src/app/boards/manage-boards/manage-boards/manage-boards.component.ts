import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-manage-boards',
  templateUrl: './manage-boards.component.html',
  styleUrls: ['./manage-boards.component.css']
})
export class ManageBoardsComponent implements OnInit {

  boardNames: Array<string>;
  currentUserUID: string;

  constructor(
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth
    ) { }

  ngOnInit(): void {
    this.boardNames = [];

    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getBoardNames(this.currentUserUID).then(
      results => {
        this.boardNames = results['companies'];
      }
    );
  }

}
