import { Injectable } from '@angular/core';
import {Enum} from '../../../domain/Enum';

@Injectable({
  providedIn: 'root'
})
export class EnumWizardService {
  enumWizardData: Enum = {
    id: undefined,
    name: undefined,
    attributes: []
  }
  previousName: string

  constructor() { }

  getEnumWizardData() {
    return this.enumWizardData;
  }

  setEnumWizardData(data: Enum) {
    this.enumWizardData = data;
  }

  reset() {
    this.enumWizardData = {
      id: undefined,
      name: undefined,
      attributes: []
    }
  }
}
