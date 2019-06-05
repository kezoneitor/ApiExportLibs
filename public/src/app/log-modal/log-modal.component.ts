import { Component, OnInit, /*Inject*/ } from '@angular/core';
import { MatDialogRef, /*MAT_DIALOG_DATA*/ } from '@angular/material';
import { AuthService } from '../auth/auth.service';

//import { User } from '../../models/User';
//Lo comentado funciona para implementar paso de Datos

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.css']
})
export class LogModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogModalComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: User,
    private authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  signInWithGoogle(): void {
    this.authService.loginWithGoogle().then(()=>{
      this.dialogRef.close(this.authService.isLoggedIn);
    });
  }

  signInWithFB(): void {
    this.authService.loginWithFacebook().then(() => {
      this.dialogRef.close(this.authService.isLoggedIn);
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.authService.isLoggedIn);
  }
}
