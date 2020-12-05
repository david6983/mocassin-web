import {Component, Input, OnInit} from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';

@Component({
  selector: 'app-ccode-editor',
  template: `
    <p-panel header='Preview of {{ filename }}'>
      <ngs-code-editor
        [theme]="theme"
        [readOnly]="readonly"
        [codeModel]="codeModel"
        [options]="options"
      >
      </ngs-code-editor>
    </p-panel>
  `,
  styles: [
  ]
})
export class CCodeEditorComponent implements OnInit {
  @Input() filename: string = 'Code';
  @Input() content: string = 'typedef struct hello {\n' +
    '\n' +
    '} hello;'
  theme = 'vs';
  readonly = true;

  codeModel: CodeModel = {
    language: 'c',
    uri: 'main.c',
    value: this.content,
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
