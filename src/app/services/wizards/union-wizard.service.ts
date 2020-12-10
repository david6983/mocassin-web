import { Injectable } from '@angular/core';
import {Union} from '../../../domain/Union';

@Injectable({
  providedIn: 'root'
})
export class UnionWizardService {
  unionWizardData: Union = {
    id: undefined,
    name: undefined,
    attributes: []
  }

  constructor() { }

  getUnionWizardData() {
    return this.unionWizardData;
  }

  setUnionWizardData(data: Union) {
    this.unionWizardData = data;
  }

  reset() {
    this.unionWizardData = {
      id: undefined,
      name: undefined,
      attributes: []
    }
  }
}
