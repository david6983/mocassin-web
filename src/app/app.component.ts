import { Component } from '@angular/core';
import {DataStructureService} from './services/data-structure.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar
      [title]="title"
      (displayPackageDialog)="displayPackageNameDialog($event)"
      [packageName]="packageName | async"
    ></app-menu-bar>
    <app-tool-bar></app-tool-bar>
    <app-side-tree-view></app-side-tree-view>
    <router-outlet></router-outlet>
    <p-dialog header="Code Preview"
              [(visible)]="displayChangePackageNameDialog"
              *ngIf="packageName | async"
              styleClass="code_dialog">
    <app-change-package-name-dialog
      [packageName]="packageName | async"
      (changedPackageName)="updatePackageName()"
    ></app-change-package-name-dialog>
    </p-dialog>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
  packageName: Observable<string>;
  packageNameValue: string;
  displayChangePackageNameDialog: boolean = false;

  constructor(private dataService: DataStructureService) {
    this.packageName = this.dataService.getPackageName();
    this.packageName.subscribe(value => {
      this.packageNameValue = value;
    })
  }

  displayPackageNameDialog(value: boolean) {
    this.displayChangePackageNameDialog = value;
  }

  updatePackageName() {
    this.displayChangePackageNameDialog = false;
  }
}
