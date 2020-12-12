import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModeService} from '../../../../services/wizards/mode-service';
import {UnionWizardService} from '../../../../services/wizards/union-wizard.service';

@Component({
  selector: 'app-create-union-wizard-step1',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Union name
      </ng-template>
      <ng-template pTemplate="subtitle">
        Enter the name of the new union that should be unique and alphanumeric in the package
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-field">
            <label for="name">Name</label>
            <input #name="ngModel" id="name" type="text" pKeyFilter="alphanum" required pInputText [(ngModel)]="newName"
                   [ngClass]="{'p-invalid': (name.invalid && submitted) || (name.dirty && name.invalid)}">
            <small *ngIf="(name.invalid && submitted) || (name.dirty && name.invalid)" class="p-error">The name is required.</small>
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
  styles: []
})
export class CreateUnionWizardStep1Component implements OnInit {
  newName: string = undefined;
  submitted: boolean = false;
  mode: string = undefined;

  constructor(private router: Router,
              private unionWizardService: UnionWizardService,
              private modeService: ModeService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.newName = this.unionWizardService.getUnionWizardData().name;
    let isModeValid = this.modeService.setAddMode(this.route.snapshot.paramMap.get('mode'));
    if (!isModeValid) {
      this.router.navigate(['']);
    }
    this.mode = this.modeService.getMode();
  }

  nextPage() {
    if (this.newName) {
      this.unionWizardService.unionWizardData.name = this.newName;
      // we can go the next page
      this.router.navigate(['createUnion/union-step2']);
    }
    this.submitted = true;
  }

  cancel() {
    this.router.navigate(['']);
  }
}
