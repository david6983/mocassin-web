import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EnumAttribute} from '../../../../../domain/EnumAttribute';
import {EnumWizardService} from '../../../../services/wizards/enum-wizard.service';
import {ModeService} from '../../../../services/wizards/mode-service';

@Component({
  selector: 'app-create-enum-wizard-step2',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Enum attributes
      </ng-template>
      <ng-template pTemplate="subtitle">
        Add your own attributes in the enum {{ displayedname }} with a unique and alphanumeric name
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-6">
              <label for="class">New attribute</label>
              <div class="p-fluid p-mt-2">
                <div class="p-field">
                  <label for="attributeName">Name</label>
                  <input #attributeName="ngModel" id="attributeName" type="text" pKeyFilter="alphanum" required pInputText [(ngModel)]="name"
                         [ngClass]="{'p-invalid': (attributeName.invalid && submitted) || (attributeName.dirty && attributeName.invalid)}">
                  <small class="p-error" *ngIf="(attributeName.invalid && submitted )|| (attributeName.dirty && attributeName.invalid)">Attribute
                    name is
                    required.</small>
                </div>
                <div class="p-field">
                  <label for="enumValue">Value</label>
                  <input #enumValue="ngModel" id="enumValue" type="number" required pInputText [(ngModel)]="value"
                         [ngClass]="{'p-invalid': (enumValue.invalid && submitted) || (enumValue.dirty && enumValue.invalid)}">
                  <small class="p-error" *ngIf="(enumValue.invalid && submitted) || (enumValue.dirty && enumValue.invalid)">Value is
                    required.</small>
                </div>
                <p-button label="Add" (onClick)="addAttribute()" [disabled]="!name"></p-button>
              </div>
            </div>
            <div class="p-field p-col-12 p-md-6">
              <label for="attribute" class="p-mb-2">Attributes</label>
              <div class="p-mt-3">
                <div *ngFor="let attr of attributes" class="p-card attributes-row p-d-flex p-jc-between">
                  <div>
                    <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                    <span class="data-name p-mr-2">{{ attr.name }} ({{ attr.value }})</span>
                  </div>
                  <div>
                    <button pButton (click)="deleteAttribute(attr.name)" type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"></button>
                  </div>
                </div>
                <small *ngIf="attributes.length === 0" class="p-error">No attributes</small>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="p-grid p-nogutter p-justify-between">
          <p-button label="Previous" (onClick)="previousPage()" icon="pi pi-angle-left" iconPos="left"
                    styleClass="p-button-warning"></p-button>
          <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [`
    .attributes-row {
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }

    .attributes-row:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class CreateEnumWizardStep2Component implements OnInit {
  displayedname: string
  submitted: boolean = false;
  name: string;
  value: number = 0;
  attributes: EnumAttribute[] = [];

  constructor(private router: Router,
              private enumWizardService: EnumWizardService,
              private modeService: ModeService
  ) { }

  ngOnInit(): void {
    let wizardData = this.enumWizardService.getEnumWizardData()
    // redirect to the previous step if the name was not defined
    if (wizardData.name === undefined) {
      this.previousPage()
    } else {
      this.displayedname = wizardData.name;
      this.value = wizardData.attributes.length;
      this.attributes = wizardData.attributes;
    }
  }

  nextPage() {
    this.router.navigate(['createEnum/enum-step-confirm']);
    this.submitted = true;
  }

  previousPage() {
    let mode = this.modeService.getMode();
    this.router.navigate(['createEnum/enum-step1/' + mode]);
  }

  addAttribute() {
    // update the form data
    this.attributes.push({id: undefined, name: this.name, value: this.value})
    // reset form and increment the value because in a C enum, the value is automatically increased if u don't specify it
    this.value = this.value + 1;
    this.name = undefined;
  }

  deleteAttribute(name: string) {
    const index: number = this.attributes.findIndex(c => c.name == name);
    this.attributes.splice(index, 1);
    this.value = this.value - 1;
  }
}
