import { Component } from '@angular/core';
import {ValidatorService} from './validator.service';
import {DataStructureService} from './data-structure.service';
import {Enum} from '../domain/Enum';
import {TypeEnum} from '../domain/TypeEnum';

@Component({
  selector: 'app-root',
  template: `
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
