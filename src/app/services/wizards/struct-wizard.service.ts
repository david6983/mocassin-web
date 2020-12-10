import { Injectable } from '@angular/core';
import {Struct} from '../../../domain/Struct';

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

  reset() {
    this.structWizardData = {
      id: undefined,
      isDisplayFunctionGenerated: false,
      name: undefined,
      attributes: []
    }
  }
}
