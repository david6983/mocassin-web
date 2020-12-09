import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
          <div class="p-mt-2"><b>Position</b></div>
        </div>
        <div class="p-field p-col-12">
          <label for="class">Attributes</label>
          <div>
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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    console.log('submit ok')
  }

  previousPage() {
    this.router.navigate(['createEnum/enum-step2']);
  }
}
