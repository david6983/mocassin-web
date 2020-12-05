import { Component } from '@angular/core';
import {DataStructureService} from './data-structure.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar
      [title]="title"
      (displayPackageDialog)="displayPackageNameDialog($event)"
      [packageName]="(packageName | async)"
    ></app-menu-bar>
    <app-tool-bar></app-tool-bar>
    <app-side-tree-view></app-side-tree-view>
    <router-outlet></router-outlet>
    <app-change-package-name-dialog
      [display]="displayChangePackageNameDialog"
      (changedPackageName)="updatePackageName()"
    ></app-change-package-name-dialog>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
  packageName: Observable<string>;
  displayChangePackageNameDialog: boolean = false;

  constructor(private dataService: DataStructureService) {
    this.updatePackageName();
  }

  displayPackageNameDialog(value: boolean) {
    console.log(value)
    this.displayChangePackageNameDialog = value;
  }

  updatePackageName() {
    this.packageName = this.dataService.getPackageName()
  }
}
