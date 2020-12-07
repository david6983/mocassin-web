import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-enum-wizard-step2',
  template: `
    <p>
      create-enum-wizard-step2 works!
    </p>
    <div class="p-grid p-nogutter p-justify-between">
        <p-button label="Previous" (onClick)="previousPage()" icon="pi pi-angle-left" iconPos="left" styleClass="p-button-warning"></p-button>
        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
    </div>
  `,
  styles: [
  ]
})
export class CreateEnumWizardStep2Component implements OnInit {
  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage() {
    this.router.navigate(['createEnum/enum-step-confirm']);
    this.submitted = true;
  }

  previousPage() {
    this.router.navigate(['createEnum/enum-step1']);
  }
}
