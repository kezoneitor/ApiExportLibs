import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
export interface functionData {
  name: string,
  code: string,
  params: string,
  fullcode: string,
  tags: string,
  deps: object,
  desc: string,
  id: string
}
@Component({
  selector: 'app-function-view',
  templateUrl: './function-view.component.html',
  styleUrls: ['./function-view.component.css']
})
export class FunctionViewComponent implements OnInit {
  Object = Object;
  constructor(public dialogRef: MatDialogRef<FunctionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: functionData,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    data.code = data.code || "";
    data.deps = data.deps || {};
    data.desc = data.desc || "";
    data.fullcode = data.fullcode || "function (){}";
    data.name = data.name || "";
    data.params = data.params || "";
    data.tags = data.tags || "";
    if (data.id != "" && data.id) {
      this.loadView(data.id);
    }
    console.log(data);
  }
  loadView(id) {

  }
  dependencia(dep) {
    console.log(dep);

    const dialogRef = this.dialog.open(FunctionViewComponent, {
      width: '50vw',
      data: { id: dep }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(console.log(result));
    });
  }
  copyToClipboard(text: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  copyFn() {
    this.copyToClipboard(this.data.fullcode);
    this.snackBar.open("Copiado al portapapeles", "Ok", { duration: 2000 })
  }
  ngOnInit() {
  }

}
