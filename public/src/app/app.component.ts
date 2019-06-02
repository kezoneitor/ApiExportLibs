import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogModalComponent } from './gallery/log-modal/log-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
