import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-enum-wizard-step-confirm',
  template: `
    <p>
      create-enum-wizard-step-confirm works!
    </p>
    <div class="p-grid p-nogutter p-justify-between">
      <p-button label="Previous" (onClick)="previousPage()" icon="pi pi-angle-left" iconPos="left" styleClass="p-button-warning"></p-button>
      <p-button label="Confirm" (onClick)="submit()" styleClass="p-button-success"></p-button>
    </div>
  `,
  styles: [
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
