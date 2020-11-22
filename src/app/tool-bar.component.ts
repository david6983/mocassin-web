import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  template: `
    <p-toolbar>
      <div class="container">
        <p-button label="Generate" icon="pi pi-play" (click)="handleGenerate()"></p-button>
        <p-button label="Save" icon="pi pi-save" styleClass="p-button-success" (click)="handleSave()"></p-button>
        <p-button label="Open" icon="pi pi-upload" styleClass="p-button-warning" (click)="handleOpen()"></p-button>
      </div>
    </p-toolbar>
  `,
  styles: [`
    .container {
      border: 1px solid var(--surface-d);
      padding: 0.5rem;
      text-align: center;
    }

    p-button {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  `]
})
export class ToolBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleSave(): void {
    console.log('from toolbar: save');
  }

  handleGenerate(): void {
    console.log('from toolbar: generate');
  }

  handleOpen(): void {
    console.log('from toolbar: open');
  }
}
