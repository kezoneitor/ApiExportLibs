import { Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogModalComponent } from './log-modal/log-modal.component';
import { MUser } from "./models/mUser";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  public is_login = false;
  @Output() user: MUser;
  constructor(public dialog: MatDialog, public authService: AuthService) { 
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
    });
  }

  logout(): void {
    this.authService.logout().then(() =>{
      this.is_login = this.authService.isLoggedIn;
      this.user = undefined;
    });
  } 
}
