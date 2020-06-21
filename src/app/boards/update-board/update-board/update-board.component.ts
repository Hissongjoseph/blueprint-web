import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.css']
})
export class UpdateBoardComponent implements OnInit {
  boardNames: any[];
  currentUserUID: string;
  updateForm: any;
  selectedBoard: any;
  boardUsers: any;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      newUser: ['', Validators.required]
    });

    this.boardNames = [];
    this.boardUsers = [];
    this.currentUserUID = this.auth.auth.currentUser.uid;

    this.firebaseService.getBoardNames(this.currentUserUID)
      .then(result => {
        this.boardNames = result;
      }
    );
  }

  onChange(event: any) {
    this.boardUsers = [];
    this.selectedBoard = event.target.value;
    this.firebaseService.getUsersOnBoard(this.selectedBoard).then(
      results => {
        this.boardUsers = results;
      }
    );
  }

  onSubmit() {
    this.user = this.updateForm.controls['newUser'].value;
    this.boardUsers['users'].push(this.user);
    this.firebaseService.addUserToBoard(this.selectedBoard, this.boardUsers).then(
      res => {
        this.updateForm.reset();
      }
    );
  }

}
