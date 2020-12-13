import { Injectable } from '@angular/core';
import {Struct} from '../../../domain/Struct';
import {Name} from '../../../domain/Name';

@Injectable({
  providedIn: 'root'
})
export class StructWizardService {
  structWizardData: Struct = {
    id: undefined,
    isDisplayFunctionGenerated: false,
    name: undefined,
    attributes: []
  }

  constructor() { }

  getStructWizardData() {
    return this.structWizardData;
  }

  setStructWizardData(data: Struct) {
    this.structWizardData = data;
  }

  toName(newName: string): Name {
    return {
      name: newName,
      id: this.structWizardData.id
    }
  }

  reset() {
    this.structWizardData = {
      id: undefined,
      isDisplayFunctionGenerated: false,
      name: undefined,
      attributes: []
    }
  }
}
