import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EnumAttribute} from '../../../../../domain/EnumAttribute';
import {EnumWizardService} from '../../../../services/wizards/enum-wizard.service';

@Component({
  selector: 'app-create-enum-wizard-step2',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Enum attributes
      </ng-template>
      <ng-template pTemplate="subtitle">
        Add your own attributes in the enum {{ displayedEnumName }}
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-6">
              <label for="class">New attribute</label>
              <div class="p-fluid p-mt-2">
                <div class="p-field">
                  <label for="attributeName">Name</label>
                  <input #attributeName="ngModel" id="attributeName" type="text" required pInputText [(ngModel)]="name"
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
                <p-button label="Add"></p-button>
              </div>
            </div>
            <div class="p-field p-col-12 p-md-6">
              <label for="wagon" class="p-mb-2">Attributes</label>
              <div class="p-mt-3">
                <div class="p-card attributes-row p-d-flex p-jc-between">
                  <div>
                    <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                    <span class="data-name p-mr-2">NORTH (0)</span>
                  </div>
                  <div>
                    <button pButton type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"></button>
                  </div>
                </div>
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
  displayedEnumName: string
  submitted: boolean = false;
  name: string;
  value: number;
  attributes: any[];

  constructor(private router: Router, private enumWizardService: EnumWizardService) { }

  ngOnInit(): void {
    let wizardData = this.enumWizardService.getEnumWizardData()
    if (wizardData.enumName === undefined) {
      //TODO enable in prod this function
      //this.previousPage()
    } else {
      this.displayedEnumName = wizardData.enumName
      this.attributes = wizardData.attributes
    }
  }

  nextPage() {
    this.router.navigate(['createEnum/enum-step-confirm']);
    this.submitted = true;
  }

  previousPage() {
    this.router.navigate(['createEnum/enum-step1']);
  }
}
