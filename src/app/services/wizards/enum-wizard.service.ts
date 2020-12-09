import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Enum} from '../../../domain/Enum';

@Injectable({
  providedIn: 'root'
})
export class EnumWizardService {
  enumWizardData = {
    enumName: undefined,
    attributes: []
  }

  private createEnumWizardComplete = new Subject<any>();

  createEnumWizardComplete$ = this.createEnumWizardComplete.asObservable()

  constructor() { }

  getEnumWizardData() {
    return this.enumWizardData;
  }

  setEnumWizardData(enumWizardData) {
    this.enumWizardData = enumWizardData;
  }

  complete() {
    this.createEnumWizardComplete.next(this.enumWizardData)
  }

  toEnum(): Enum {
    let e = {
      id: undefined,
      name: this.enumWizardData.enumName,
      attributes: []
    }
    this.enumWizardData.attributes.forEach(attr => {
      e.attributes.push({
        id: undefined,
        name: attr.name,
        value: attr.value
      })
    })

    return e;
  }

  reset() {
    this.enumWizardData = {
      enumName: undefined,
      attributes: []
    }
  }

  fromEnum(e: Enum) {
    this.enumWizardData.enumName = e.name;
    e.attributes.forEach(attr => {
      this.enumWizardData.attributes.push({
        name: attr.name,
        value: attr.value
      })
    })
  }
}
