import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatChipInputEvent } from '@angular/material';
import { FunctionViewComponent, functionData, getColor, contrast } from '../function-view/function-view.component';
import { LingsService } from '../services/lings.service';
import { SearchLibComponent } from '../search-lib/search-lib.component';
import { SPACE, COMMA, ENTER } from '@angular/cdk/keycodes';

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
  tagsKeyCodes = [SPACE, ENTER, COMMA];
  editor: functionData = {
    name: "",
    desc: "",
    code: "",
    fullcode: "",
    tags: "los tags aquí",
    params: "par1, par2",
    deps: {},
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
  removeDep(dependencia){
    delete (this.editor.deps[dependencia]);
  }
  removeTag(tag: string) {
    let tags:string[] = this.editor.tags.split(' ');
    tags.splice(tags.indexOf(tag) , 1);
    this.editor.tags = tags.join(' ').trim();
  }
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.editor.tags += ` ${value.trim()}`;
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  addDep() {
    if (this.depID != "" && !this.editor.deps[this.depID]) {
      this.lingsAPI.getNameByID(this.depID)
        .then((name) => {
          if (name) {
            this.editor.deps[this.depID] = name;
            this.depID = "";
            this.snackBar.open("Dependencia añadida", "Ok", { duration: 2000 })
          } else
            this.snackBar.open("Ingrese un id de función existente", "Ok", { duration: 2000 })
        }).catch((error) => {
          this.snackBar.open(JSON.stringify(error), "Ok", { duration: 10000 })
        });
    }
  }
  send() {
    if (this.editor.name == "")
      this.snackBar.open("Escriba un nombre a su función", "Ok", { duration: 2000 });
    else if (this.editor.code == "")
      this.snackBar.open("La función más útil del mundo", "Ok", { duration: 2000 });
    else if (this.editor.desc == "")
      this.snackBar.open("Escriba una descripción", "Ok", { duration: 2000 });
    else if (this.editor.tags == "")
      this.snackBar.open("Incluye un tag", "Ok", { duration: 2000 });
    else if (localStorage.getItem('user') != null) {
      let user = JSON.parse(localStorage.getItem('user')).uid;
      this.lingsAPI.AddFunction({
        code: "",
        script: this.editor.fullcode,
        tags: this.editor.tags.split(" "),
        dependencies: this.Object.keys(this.editor.deps),
        function_user: user,
        description: this.editor.desc,
        f_name: this.editor.name
      }).subscribe({
        next: result => {
          this.editor = {
            name: "",
            desc: "",
            code: "",
            fullcode: "",
            tags: "los tags aquí",
            params: "par1, par2",
            deps: {},
            id: undefined
          }
          this.lingsAPI.LoadUserFns(user, LingsService.pageSize_U, LingsService.pageSize * LingsService.pageIndex_U);
          this.lingsAPI.Length();
          this.lingsAPI.LingsAll(LingsService.pageSize, LingsService.pageSize * LingsService.pageIndex);
          console.log(result);
        },
        error: error => {
          console.log(error);
        }
      })

    }
    else
      this.snackBar.open("Inicie sesión primero", "Ok", { duration: 2000 });
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
