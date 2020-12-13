import { Injectable } from '@angular/core';
import {Enum} from '../../../domain/Enum';
import {Name} from '../../../domain/Name';

@Injectable({
  providedIn: 'root'
})
export class EnumWizardService {
  enumWizardData: Enum = {
    id: undefined,
    name: undefined,
    attributes: []
  }

  constructor() { }

  getEnumWizardData() {
    return this.enumWizardData;
  }

  setEnumWizardData(data: Enum) {
    this.enumWizardData = data;
  }

  toName(newName: string): Name {
    return {
      name: newName,
      id: this.enumWizardData.id
    }
  }

  reset() {
    this.enumWizardData = {
      id: undefined,
      name: undefined,
      attributes: []
    }
  }
}
