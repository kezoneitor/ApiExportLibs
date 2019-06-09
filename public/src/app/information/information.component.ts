import { Component, OnInit, Input, /*Inject*/ } from '@angular/core';
import { MatDialogRef, MatDialog, /*MAT_DIALOG_DATA*/ } from '@angular/material';
import { LingsService } from "../services/lings.service";
import { LogModalComponent } from '../log-modal/log-modal.component';
import { AuthService } from "../auth/auth.service";
import { MUser } from '../models/mUser';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<InformationComponent>,
    public lingsService:LingsService,
    public dialog: MatDialog,
    public authService: AuthService

  ) { }
  ngOnInit() {
  }
  user : MUser;
  is_login: boolean;

  downloadJS() {
    this.lingsService.downloadFile("/../assets/scripts/fingerlings.js", "fingerlings");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.is_login = result;
      this.user = this.authService.getUser;
      this.lingsService.AddUser(this.user).subscribe({
        error: error => {
          console.log(error);
        }
      });
    });
  }
  onNoClick(): void {
    this.dialogRef.close([this.user, this.is_login]);
  }

}
