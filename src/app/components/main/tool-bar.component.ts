import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {DataStructureService} from '../../services/data-structure.service';

@Component({
  selector: 'app-tool-bar',
  template: `
    <p-toolbar>
      <div class="container">
        <p-button label="Generate" icon="pi pi-copy" styleClass="p-button-success" (click)="handleGenerate()"></p-button>
        <p-confirmDialog header="Confirmation" icon="pi pi-exclamation-triangle"></p-confirmDialog>
        <p-button label="New Project" icon="pi pi-file" styleClass="p-button-warning" (click)="confirm($event)"></p-button>
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
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private dataService: DataStructureService
  ) { }

  ngOnInit(): void {
  }

  handleGenerate() {
    this.router.navigate(["/generate"])
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete all the data in this project?',
      accept: () => {
        this.dataService.newProject();
        this.dataService.deleteAll()
      }
    });
  }
}
