import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  functionName: String = "";
  function: String = "";
  parametros: String = "";
  codeView = "";

  constructor() {
    this.updateView();
  }
  ngOnInit() {
  }
  updateView() {
    setTimeout(() => {
      this.parametros = this.parametros.replace(' ', '').split(',').join(',');
    }, 0)
    this.codeView = `function ${this.functionName}(${this.parametros}){\n${this.function}\n}`;
  }
  codeUpdate(event) {
    let lines: Array<string> = event.split('\n');
    let functionHeader = `function ${this.functionName}(${this.parametros}){`;
    if (!(lines[0].length >= functionHeader.length) && lines[0] != functionHeader && this.function.split('\n')[0] != lines[1]) {
      lines.splice(1, 1);
    }
    lines.splice(0, 1);
    if (lines[lines.length - 1].length == 0)
      lines.pop()
    if (lines[lines.length - 1].length != 1)
      lines[lines.length - 1] = this.function.split('\n').reverse()[0];
    else
      lines.splice(lines.length - 1, 1);
    this.function = lines.join('\n');
    setTimeout(() => {
      this.updateView();
    }, 0)
  }
}
