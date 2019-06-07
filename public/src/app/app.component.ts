import { Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogModalComponent } from './log-modal/log-modal.component';
import { MUser } from "./models/mUser";
import { AuthService } from "./auth/auth.service";
import { LingsService } from './services/lings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  public is_login = false;
  @Output() user: MUser;
  constructor(public dialog: MatDialog, public authService: AuthService, private lingS: LingsService) {
    this.is_login = this.authService.isLoggedIn;
    if (this.is_login) {
      this.user = this.authService.getUser;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.is_login = result;
      this.user = this.authService.getUser;
      this.lingS.AddUser(this.user).subscribe({
        error: error => {
          console.log(error);
        }
      });
    });
  }

  downloadJS() {
    //this.lingS.downloadFile("/../assets/scripts/fingerlings.js", "fingerlings");
    this.lingS.compile(1);
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.is_login = this.authService.isLoggedIn;
      this.user = undefined;
    });
  }
}
