import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ValidatorService} from '../../../../services/validator.service';
import {EnumWizardService} from '../../../../services/wizards/enum-wizard.service';

@Component({
  selector: 'app-create-enum-wizard-step1',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Enum name
      </ng-template>
      <ng-template pTemplate="subtitle">
        Enter the name of the new enumeration that should be unique in the package
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-field">
            <label for="name">Name</label>
            <input #name="ngModel" id="name" type="text" required pInputText [(ngModel)]="newName"
                   [ngClass]="{'p-invalid': (name.invalid && submitted) || (name.dirty && name.invalid)}">
            <small *ngIf="(name.invalid && submitted) || (name.dirty && name.invalid)" class="p-error">The name is required.</small>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="p-grid p-nogutter p-justify-end">
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

  constructor(private router: Router, private enumWizardService: EnumWizardService) {
  }

  ngOnInit(): void {
    this.newName = this.enumWizardService.getEnumWizardData().enumName;
  }

  nextPage() {
    if (this.newName) {
      this.enumWizardService.enumWizardData.enumName = this.newName;
      // we can go the next page
      this.router.navigate(['createEnum/enum-step2']);
    }
    this.submitted = true;
  }
}
