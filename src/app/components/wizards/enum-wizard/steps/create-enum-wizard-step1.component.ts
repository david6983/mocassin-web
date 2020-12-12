import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EnumWizardService} from '../../../../services/wizards/enum-wizard.service';
import {ModeService} from '../../../../services/wizards/mode-service';
import {ValidatorService} from '../../../../services/validator.service';
import {TypeEnum} from '../../../../../domain/TypeEnum';

@Component({
  selector: 'app-create-enum-wizard-step1',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Enum name
      </ng-template>
      <ng-template pTemplate="subtitle">
        Enter the name of the new enumeration that should be unique and alphanumeric in the package
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-field">
            <label for="name">Name</label>
            <input #name="ngModel" id="name" type="text" pKeyFilter="alphanum" required pInputText [(ngModel)]="newName"
                   [ngClass]="{'p-invalid': (name.invalid && submitted) || (name.dirty && name.invalid)}">
            <small *ngIf="(name.invalid && submitted) || (name.dirty && name.invalid)" class="p-error">The name is required.</small>
            <small *ngIf="isUniqueDisplayError" class="p-error">The name is not unique in this enum (found in enum attributes in step 2)</small>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="p-grid p-nogutter p-justify-between">
          <p-button label="Cancel" (onClick)="cancel()" icon="pi pi-times" iconPos="left" styleClass="p-button-danger"></p-button>
          <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right" [disabled]="!newName"></p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [
  ]
})
export class CreateEnumWizardStep1Component implements OnInit {
  newName: string = undefined;
  submitted: boolean = false;
  isUniqueDisplayError: boolean = false;
  mode: string = undefined;

  constructor(private router: Router,
              private enumWizardService: EnumWizardService,
              private modeService: ModeService,
              private route: ActivatedRoute,
              private validator: ValidatorService
  ) {
  }

  ngOnInit(): void {
    this.newName = this.enumWizardService.getEnumWizardData().name;
    let isModeValid = this.modeService.setAddMode(this.route.snapshot.paramMap.get('mode'));
    if (!isModeValid) {
      this.router.navigate(['']);
    }
    this.mode = this.modeService.getMode();
  }

  nextPage() {
    if (this.newName) {
      let isUnique = this.validator.isNameUnique(this.newName, this.enumWizardService.getEnumWizardData(), TypeEnum.ENUM);
      if (isUnique) {
        this.enumWizardService.enumWizardData.name = this.newName;
        // we can go the next page
        this.router.navigate(['createEnum/enum-step2']);
        this.submitted = true;
        this.isUniqueDisplayError = false;
      } else {
        this.isUniqueDisplayError = true;
      }
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
