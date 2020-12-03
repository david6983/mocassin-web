import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar></app-menu-bar>
    <app-tool-bar></app-tool-bar>
    <div class="p-grid">
      <div class="p-col-fixed" style="width:40%; height: auto">
        <app-side-tree-view></app-side-tree-view>
      </div>
      <div class="p-col">Auto</div>
    </div>
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
