import { Injectable } from '@angular/core';
import {Union} from '../../../domain/Union';
import {Name} from '../../../domain/Name';

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

  toName(newName: string): Name {
    return {
      name: newName,
      id: this.unionWizardData.id
    }
  }

  reset() {
    this.unionWizardData = {
      id: undefined,
      name: undefined,
      attributes: []
    }
  }
}
