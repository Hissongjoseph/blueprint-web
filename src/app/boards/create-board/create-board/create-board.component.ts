import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {
  boardForm: any;
  currentUserUID: string;
  boardName: any;
  exists: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private firebaseService: FirebaseService,

  ) { }

  ngOnInit(): void {
    this.boardForm = this.formBuilder.group({
      newBoard: ['', Validators.required]
    });
    this.currentUserUID = this.auth.auth.currentUser.email;
  }


  onSubmit() {
    this.boardName = this.boardForm.controls['newBoard'].value;

    this.firebaseService.checkIfBoardExists(this.boardName).then(
      res => {
        if (res === false) {
          this.firebaseService.createBoard(this.boardName, this.currentUserUID);
          this.firebaseService.addBoardToUser(this.boardName, this.currentUserUID);
        }
        else {
          console.log("Exists");
        }
      }
    );
  }
}
