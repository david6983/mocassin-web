import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEnumWizardComponent} from './components/wizards/enum-wizard/create-enum-wizard.component';
import {CreateEnumWizardStep1Component} from './components/wizards/enum-wizard/steps/create-enum-wizard-step1.component';
import {CreateEnumWizardStep2Component} from './components/wizards/enum-wizard/steps/create-enum-wizard-step2.component';
import {CreateEnumWizardStepConfirmComponent} from './components/wizards/enum-wizard/steps/create-enum-wizard-step-confirm.component';

const routes: Routes = [
  { path: 'createEnum', component: CreateEnumWizardComponent, children: [
      {path:'', redirectTo: 'enum-step1', pathMatch: 'full'},
      {path: 'enum-step1', component: CreateEnumWizardStep1Component},
      {path: 'enum-step2', component: CreateEnumWizardStep2Component},
      {path: 'enum-step-confirm', component: CreateEnumWizardStepConfirmComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
