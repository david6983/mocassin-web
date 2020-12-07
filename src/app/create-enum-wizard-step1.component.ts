import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-enum-wizard-step1',
  template: `
    <p>
      create-enum-wizard-step1 works!
    </p>
    <div class="p-grid p-nogutter p-justify-end">
        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
    </div>
  `,
  styles: [
  ]
})
export class CreateEnumWizardStep1Component implements OnInit {
  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage() {
    this.router.navigate(['createEnum/enum-step2']);
    this.submitted = true;
  }
}
