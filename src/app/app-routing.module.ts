import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEnumFormComponent} from './create-enum-form.component';
import {CreateUnionFormComponent} from './create-union-form.component';
import {CreateStructFormComponent} from './create-struct-form.component';
import {CreateEnumWizardStep1Component} from './create-enum-wizard-step1.component';
import {CreateEnumWizardStep2Component} from './create-enum-wizard-step2.component';
import {CreateEnumWizardStepConfirmComponent} from './create-enum-wizard-step-confirm.component';

const routes: Routes = [
  { path: 'createEnum', component: CreateEnumFormComponent, children: [
      {path:'', redirectTo: 'enum-step1', pathMatch: 'full'},
      {path: 'enum-step1', component: CreateEnumWizardStep1Component},
      {path: 'enum-step2', component: CreateEnumWizardStep2Component},
      {path: 'enum-step-confirm', component: CreateEnumWizardStepConfirmComponent}
    ]},
  { path: 'createUnion', component: CreateUnionFormComponent },
  { path: 'createStruct', component: CreateStructFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
