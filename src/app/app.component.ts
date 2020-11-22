import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <h1>
      Welcome to {{title}}!
    </h1>
    <button pButton type="button" label="Click" (click)="handleClick()" ></button>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'mocassin-web-app';

  handleClick(): void {
    console.log('hello primeng');
  }
}
