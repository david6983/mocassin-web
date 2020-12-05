import { Component, OnInit } from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
  selector: 'app-tool-bar',
  template: `
    <p-toolbar>
      <div class="container">
        <p-button label="Generate" icon="pi pi-play" (click)="handleGenerate()"></p-button>
        <p-button label="Save" icon="pi pi-save" styleClass="p-button-success" (click)="handleSave()"></p-button>
        <p-button label="New" icon="pi pi-file" styleClass="p-button-warning" (click)="handleNew()"></p-button>
      </div>
    </p-toolbar>
  `,
  styles: [`
    .container {
      margin: 0 auto;
      border: 1px solid var(--surface-d);
      padding: 0.5rem;
    }

    p-button {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    p-toolbar {
      margin: 1rem;
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

  handleNew(): void {
    console.log('from toolbar: New');
  }
}
