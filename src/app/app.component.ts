import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <app-tool-bar></app-tool-bar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
}
