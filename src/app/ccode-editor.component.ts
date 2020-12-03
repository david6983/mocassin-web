import { Component, OnInit } from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {PanelModule} from 'primeng/panel';

@Component({
  selector: 'app-ccode-editor',
  template: `
    <p-panel header="Edit C file">
      <ngs-code-editor
        [theme]="theme"
        [codeModel]="codeModel"
        [options]="options"
        (valueChanged)="onCodeChanged($event)"
      >
      </ngs-code-editor>
    </p-panel>
  `,
  styles: [
  ]
})
export class CCodeEditorComponent implements OnInit {
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'c',
    uri: 'main.c',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  onCodeChanged(value) {
    console.log('CODE', value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
