import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-create-struct-wizard',
  template: `
    <div class="p-m-2">
      <div class="p-mb-3">
        <p-steps [model]="items" [readonly]="true" [(activeIndex)]="activeIndex"></p-steps>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class CreateStructWizardComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Struct infos',
        routerLink: 'struct-step-1',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Struct attributes',
        routerLink: 'struct-step-2',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirm',
        routerLink: 'struct-step-confirm',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }

}
