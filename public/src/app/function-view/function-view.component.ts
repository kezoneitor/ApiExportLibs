import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LingsService } from '../services/lings.service';
import { Lings } from '../models/Lings';
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

export function getColor(cadena: string): string {
  let i = ((str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  })(cadena);
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  let result = "00000".substring(0, 6 - c.length) + c;
  return "#" + result;
}
export function contrast(cadena: string): string {
  var bgColor = this.getColor(cadena);
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return L > 0.179 ? "#000000" : "#FFFFFF";
}
@Component({
  selector: 'app-function-view',
  templateUrl: './function-view.component.html',
  styleUrls: ['./function-view.component.css']
})
export class FunctionViewComponent implements OnInit {
  Object = Object;
  contrast = contrast;
  getColor = getColor;
  constructor(public dialogRef: MatDialogRef<FunctionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: functionData,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public lingsAPI: LingsService) {
    data.code = data.code || "";
    data.deps = data.deps || {};
    data.desc = data.desc || "";
    data.fullcode = data.fullcode || "function (){}";
    data.name = data.name || "";
    data.params = data.params || "";
    data.tags = data.tags || "";
    if (data.id && data.id != "") {
      this.loadView(data.id);
    }
  }
  compile(){
    console.log(this.data.id)
    if(this.data && this.data.id && this.data.id !='' ){
      this.lingsAPI.compile(this.data.id);
    }
  }
  loadView(id) {
    //Aquí cargo los datos de la función
    this.lingsAPI.getCode(id)
      .then((code: Lings) => {
        this.data.fullcode = code.script;
        this.data.desc = code.description;
        this.data.name = code.f_name;

        this.data.tags = ((code.tags.toString().substr(1, code.tags.toString().length - 2)).split(",")).join(" ");
        let deps: string[] = code.dependencies ? ((code.dependencies.toString().substr(1, code.dependencies.toString().length - 2)).split(",")) : [];
        deps.forEach(async dep => {
          if (dep == "") return;
          let name = await this.lingsAPI.getNameByID(dep);
          if (name)
            this.data.deps[dep] = name;
        })
      })
      .catch((error) => {
        this.snackBar.open(JSON.stringify(error), "Ok", { duration: 10000 })
      })
  }
  dependencia(dep) {

    const dialogRef = this.dialog.open(FunctionViewComponent, {
      width: '50vw',
      data: { id: dep }
    });

    dialogRef.afterClosed();
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
    this.copyToClipboard(this.data.id ? `http://leoviquez.com:8000/fingerlings/importer.php?code=${this.data.id}`:this.data.fullcode);
    this.snackBar.open("Copiado al portapapeles", "Ok", { duration: 2000 })
  }
  whatCopy(){
    return this.data.id ? "Copiar URL" : "Copiar Sólo Función";
  }

  ngOnInit() {
  }

}
