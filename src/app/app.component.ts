import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-home-cards></app-home-cards>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
}
