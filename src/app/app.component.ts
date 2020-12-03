import { Component } from '@angular/core';
import {ValidatorService} from './validator.service';
import {DataStructureService} from './data-structure.service';
import {Enum} from '../domain/Enum';
import {TypeEnum} from '../domain/TypeEnum';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar></app-menu-bar>
    <app-tool-bar></app-tool-bar>
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
