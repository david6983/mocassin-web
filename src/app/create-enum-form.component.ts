import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-create-enum-form',
  template: `
    <div class="p-m-2">
      <p-steps [model]="items" [readonly]="true" [(activeIndex)]="activeIndex"></p-steps>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class CreateEnumFormComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Enum name',
        routerLink: 'enum-step-1',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Enum attributes',
        routerLink: 'enum-step-2',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirm',
        routerLink: 'enum-step-confirm',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }

}
