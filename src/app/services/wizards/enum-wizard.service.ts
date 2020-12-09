import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

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
}
