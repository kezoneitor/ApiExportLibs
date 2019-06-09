import { Component, Output, OnChanges, SimpleChange} from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogModalComponent } from './log-modal/log-modal.component';
import { MUser } from "./models/mUser";
import { AuthService } from "./auth/auth.service";
import { LingsService } from './services/lings.service';
import { InformationComponent } from './information/information.component';

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

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(InformationComponent, {
      width: '50%',
      height: '95%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.is_login = result[1];
        this.user = result[0];
      }
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.is_login = this.authService.isLoggedIn;
      this.user = undefined;
    });
  }
}
