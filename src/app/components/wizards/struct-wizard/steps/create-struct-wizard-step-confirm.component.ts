import { Component, OnInit } from '@angular/core';
import {Struct} from '../../../../../domain/Struct';
import {Router} from '@angular/router';
import {StructWizardService} from '../../../../services/wizards/struct-wizard.service';
import {DataStructureService} from '../../../../services/data-structure.service';
import {ModeService} from '../../../../services/wizards/mode-service';
import {TypeEnum} from '../../../../../domain/TypeEnum';

@Component({
  selector: 'app-create-struct-wizard-step-confirm',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Confirmation
      </ng-template>
      <ng-template pTemplate="subtitle">
        Verify your data before submitting
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-field p-col-12">
          <label for="class">Name</label><br>
          <div class="p-mt-2"><b>{{ wizardData.name }}</b></div>
        </div>
        <div class="p-field p-col-12">
          <label for="class">Attributes</label>
          <div>
            <div *ngFor="let attr of wizardData.attributes" class="p-card attributes-row p-d-flex p-jc-between">
              <div>
                <p-checkbox name="structs" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                <span class="data-name p-mr-2">{{ attr.name }} ({{ attr.type }}{{ attr.isPointer ? '*' : ''}})</span>
              </div>
            </div>
            <small *ngIf="wizardData.attributes.length === 0" class="p-error">No attributes, are you sure you don't want any attributes inside ?</small>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="p-grid p-nogutter p-justify-between">
          <p-button label="Previous" (onClick)="previousPage()" icon="pi pi-angle-left" iconPos="left" styleClass="p-button-warning"></p-button>
          <p-button label="Confirm" (onClick)="submit()" styleClass="p-button-success"></p-button>
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
  `
  ]
})
export class CreateStructWizardStepConfirmComponent implements OnInit {
  wizardData: Struct;

  constructor(private router: Router,
              private structWizardService: StructWizardService,
              private dataStructureService: DataStructureService,
              private modeService: ModeService
  ) { }

  ngOnInit(): void {
    this.wizardData = this.structWizardService.getStructWizardData()
    console.log(this.wizardData.name)
    // redirect to the previous step if the name was not defined
    if (this.wizardData.name === undefined) {
      this.router.navigate(['createStruct/']);
    }
  }

  submit() {
    let mode = this.modeService.getMode();

    if (mode === "add") {
      this.dataStructureService.addDataStruct(this.structWizardService.structWizardData, TypeEnum.STRUCT);
    } else if (mode === "edit") {
      this.dataStructureService.editDataStruct(this.structWizardService.structWizardData, TypeEnum.STRUCT);
    }

    this.structWizardService.reset();
    this.router.navigate(['']);
  }

  previousPage() {
    this.router.navigate(['createStruct/struct-step2']);
  }

}
