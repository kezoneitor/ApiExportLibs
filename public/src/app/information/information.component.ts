import { Component, OnInit, /*Inject*/ } from '@angular/core';
import { MatDialogRef, /*MAT_DIALOG_DATA*/ } from '@angular/material';
import { LingsService } from "../services/lings.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<InformationComponent>,
    public lingsService:LingsService
  ) { }

  ngOnInit() {
  }

  downloadJS() {
    this.lingsService.downloadFile("/../assets/scripts/fingerlings.js", "fingerlings");
  }

}
