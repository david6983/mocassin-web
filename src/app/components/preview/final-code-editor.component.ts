import {Component, Input, OnInit} from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-final-code-editor',
  template: `
    <p-panel header='Generation of {{ filename }}'>
      <ngs-code-editor
        [theme]="theme"
        [readOnly]="readonly"
        [codeModel]="codeModel"
        [options]="options"
      >
      </ngs-code-editor>
    </p-panel>
    <div class="p-grid p-nogutter p-justify-between p-m-2">
      <p-button label="Cancel" (onClick)="cancel()" icon="pi pi-times" iconPos="left" styleClass="p-button-danger"></p-button>
      <button pButton
              [cdkCopyToClipboard]="content"
              type="button"
              label="Copy Code to clipboard"
      ></button>
    </div>
  `,
  styles: [`
    ::ng-deep .ngs-content-editor {
      height: 300px;
    }

    ::ng-deep .ngs-content-editor {
      height: 300px;
    }
  `]
})
export class FinalCodeEditorComponent implements OnInit {
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(["/"])
  }
}
