import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar [title]="title"></app-menu-bar>
    <app-tool-bar></app-tool-bar>
    <div class="p-grid">
      <div class="p-col-fixed" style="width:30%; height: auto">
        <app-side-tree-view></app-side-tree-view>
      </div>
      <div class="p-col-fixed" style="width:70%; height: auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
  types;

  constructor() {

  }
}
