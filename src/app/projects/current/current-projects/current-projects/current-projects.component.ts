import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-current-projects',
  templateUrl: './current-projects.component.html',
  styleUrls: ['./current-projects.component.css']
})
export class CurrentProjectsComponent implements OnInit {

  currentUserUID: string;

  projectNames: Array<any>;
  projectDetails: Array<any>;
  selectedProject!: string;

  constructor(
    public auth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.projectNames = [];
    this.selectedProject = '';

    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getBoardNames(this.currentUserUID)
      .then(result => {
        this.projectNames = result;
      }
      );
  }

  onChange(event: any) {
    this.selectedProject = event.target.value;
    this.firebaseService.getAllProjectDetails(this.currentUserUID, this.selectedProject)
      .then(
        result => {
          this.projectDetails = result;
        }
      );
  }

  downloadCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Current Projects',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.projectDetails);
  }
}
