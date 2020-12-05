import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar [title]="title"></app-menu-bar>
    <app-tool-bar></app-tool-bar>
    <app-side-tree-view></app-side-tree-view>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
  types;

  constructor() {

  }
}
