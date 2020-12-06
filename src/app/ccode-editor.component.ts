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
      <button pButton
              [cdkCopyToClipboard]="content"
              type="button"
              label="Copy Code to clipboard"
              class="p-mt-2"
      ></button>
  `,
  styles: []
})
export class CCodeEditorComponent implements OnInit {
  @Input() filename: string;
  @Input() content: string = "";
  @Input() codeModel: CodeModel;
  theme = 'vs';
  readonly = true;

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
