import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FunctionViewComponent, functionData, getColor, contrast } from '../function-view/function-view.component';
import { LingsService } from '../services/lings.service';

interface requestdata {
  name: string,
  function: string,
  desc: string,
  params: string[],
  deps: string[],
  tags: string[],
  user: string
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  Object = Object;
  contrast = contrast;
  getColor = getColor;
  editor: functionData = {
    name: "suma",
    desc: "suma dos valores",
    code: "return x + y;",
    fullcode: "",
    tags: "math simple",
    params: "x,y",
    deps: { 0: "dependencia 1" },
    id: undefined
  }
  depID = "";
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public lingsAPI: LingsService) {
    this.updateView();
  }
  ngOnInit() {
  }
  updateView() {
    setTimeout(() => {
      this.editor.name = this.editor.name.replace(/\s/g, "");
      this.editor.params = this.editor.params.replace(' ', '').split(',').join(',');
      this.editor.fullcode = `function ${this.editor.name}(${this.editor.params}){\n${this.editor.code}\n}`;
    }, 0)
  }
  codeUpdate(event) {
    let lines: Array<string> = event.split('\n');
    let functionHeader = `function ${this.editor.name}(${this.editor.params}){`;
    if (!(lines[0].length >= functionHeader.length) && lines[0] != functionHeader && this.editor.code.split('\n')[0] != lines[1]) {
      lines.splice(1, 1);
    }
    lines.splice(0, 1);
    if (lines[lines.length - 1].length == 0)
      lines.pop()
    if (lines[lines.length - 1].length != 1)
      lines[lines.length - 1] = this.editor.code.split('\n').reverse()[0];
    else
      lines.splice(lines.length - 1, 1);
    this.editor.code = lines.join('\n');
    setTimeout(() => {
      this.updateView();
    }, 0)
  }
  removeDep(dependencia) {
    delete (this.editor.deps[dependencia]);
  }
  send() {
    let data: requestdata = {
      name: this.editor.name,
      params: this.editor.params.replace(' ', '').split(','),
      function: this.editor.fullcode,
      desc: this.editor.desc,
      tags: this.editor.tags.split(' '),
      deps: Object.keys(this.editor.deps),
      user: "",
    }
    console.log(data);
  }
  addDep() {
    if (this.depID != "" && !this.editor.deps[this.depID]) {
      this.lingsAPI.getNameByID(this.depID)
        .then((name) => {
          this.editor.deps[this.depID] = name;
          this.depID = "";
          this.snackBar.open("Dependencia añadida", "Ok", { duration: 2000 })
        }).catch((error) => {
          this.snackBar.open(JSON.stringify(error), "Ok", { duration: 10000 })
        });
    }
  }
  preview() {
    const dialogRef = this.dialog.open(FunctionViewComponent, {
      width: '50vw',
      data: this.editor
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(console.log(result));
    });
  }
}
