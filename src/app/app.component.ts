import { Component } from '@angular/core';
import {ValidatorService} from './validator.service';
import {DataStructureService} from './data-structure.service';

@Component({
  selector: 'app-root',
  template: `
    <select>
      <option *ngFor="let type of (types | async)">
        <span>{{ type }}</span>
      </option>
    </select>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mocassin';
  types;

  constructor(
    private validatorService: ValidatorService,
    private dataStructureService: DataStructureService
  ) {
    validatorService.getReservedCWordsList();
    this.types = validatorService.getTypesList();
  }
}
