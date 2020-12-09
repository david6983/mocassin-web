import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EnumWizardService} from '../../../../services/wizards/enum-wizard.service';
import {DataStructureService} from '../../../../services/data-structure.service';
import {TypeEnum} from '../../../../../domain/TypeEnum';

@Component({
  selector: 'app-create-enum-wizard-step-confirm',
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
          <div class="p-mt-2"><b>{{ wizardData.enumName }}</b></div>
        </div>
        <div class="p-field p-col-12">
          <label for="class">Attributes</label>
          <div>
            <div *ngFor="let attr of wizardData.attributes" class="p-card attributes-row p-d-flex p-jc-between">
              <div>
                <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                <span class="data-name p-mr-2">{{ attr.name }} ({{ attr.value }})</span>
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
export class CreateEnumWizardStepConfirmComponent implements OnInit {
  wizardData: {enumName: any, attributes: any[]};

  constructor(private router: Router,
              private enumWizardService: EnumWizardService,
              private dataStructureService: DataStructureService) { }

  ngOnInit(): void {
    this.wizardData = this.enumWizardService.getEnumWizardData()
    // redirect to the previous step if the name was not defined
    if (this.wizardData.enumName === undefined) {
      this.router.navigate(['createEnum/enum-step1']);
    }
  }

  submit() {
    // if the name doesn't exist, add it
    this.dataStructureService.addDataStruct(this.enumWizardService.toEnum(), TypeEnum.ENUM);
    // else it's an edit
    //TODO if the name exist call edit instead of add
    this.enumWizardService.reset();
    this.router.navigate(['']);
  }

  previousPage() {
    this.router.navigate(['createEnum/enum-step2']);
  }
}
