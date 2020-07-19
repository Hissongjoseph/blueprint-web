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
    this.selectedProject = localStorage.getItem('board');

    this.currentUserUID = this.auth.auth.currentUser.email;

    this.firebaseService.getAllProjectDetails(this.currentUserUID, this.selectedProject)
      .then(
        result => {
          if (result.length > 0) {
            this.projectDetails = result;
          }
        }
      ).catch(
        res => {
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
