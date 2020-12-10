import { Injectable } from '@angular/core';
import {Enum} from '../../../domain/Enum';

@Injectable({
  providedIn: 'root'
})
export class EnumWizardService {
  private mode: string = "add";

  enumWizardData: Enum = {
    id: undefined,
    name: undefined,
    attributes: []
  }

  constructor() { }

  getEnumWizardData() {
    return this.enumWizardData;
  }

  setEnumWizardData(enumWizardData) {
    this.enumWizardData = enumWizardData;
  }

  reset() {
    this.enumWizardData = {
      id: undefined,
      name: undefined,
      attributes: []
    }
  }

  setAddMode(name: string): boolean {
    switch (name) {
      case "add":
      case "edit":
        this.mode = name;
        return true;
      default:
        return false;
    }
  }

  getMode(): string {
    return this.mode;
  }
}
