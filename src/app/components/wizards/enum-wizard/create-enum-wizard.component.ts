import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-create-enum-form',
  template: `
    <div class="p-m-2">
      <div class="p-mb-3">
        <p-steps [model]="items"></p-steps>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class CreateEnumWizardComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Enum infos',
        routerLink: 'enum-step-1'
      },
      {
        label: 'Enum attributes',
        routerLink: 'enum-step-2'
      },
      {
        label: 'Confirm',
        routerLink: 'enum-step-confirm'
      }
    ];
  }

}
