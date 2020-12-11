import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  template: `
    <p-toolbar>
      <div class="container">
        <p-button label="Generate" icon="pi pi-copy" styleClass="p-button-success" (click)="handleGenerate()"></p-button>
        <p-button label="New Project" icon="pi pi-file" styleClass="p-button-warning" (click)="handleNew()"></p-button>
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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleNew(): void {
    console.log('from toolbar: New');
  }

  handleGenerate() {
    this.router.navigate(["/generate"])
  }
}
