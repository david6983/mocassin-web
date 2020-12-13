import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEnumWizardComponent} from './components/wizards/enum-wizard/create-enum-wizard.component';
import {CreateEnumWizardStep1Component} from './components/wizards/enum-wizard/steps/create-enum-wizard-step1.component';
import {CreateEnumWizardStep2Component} from './components/wizards/enum-wizard/steps/create-enum-wizard-step2.component';
import {CreateEnumWizardStepConfirmComponent} from './components/wizards/enum-wizard/steps/create-enum-wizard-step-confirm.component';
import {CreateUnionWizardComponent} from './components/wizards/union-wizard/create-union-wizard.component';
import {CreateUnionWizardStep1Component} from './components/wizards/union-wizard/steps/create-union-wizard-step1.component';
import {CreateUnionWizardStepConfirmComponent} from './components/wizards/union-wizard/steps/create-union-wizard-step-confirm.component';
import {CreateUnionWizardStep2Component} from './components/wizards/union-wizard/steps/create-union-wizard-step2.component';
import {CreateStructWizardStep2Component} from './components/wizards/struct-wizard/steps/create-struct-wizard-step2.component';
import {CreateStructWizardStepConfirmComponent} from './components/wizards/struct-wizard/steps/create-struct-wizard-step-confirm.component';
import {CreateStructWizardComponent} from './components/wizards/struct-wizard/create-struct-wizard.component';
import {CreateStructWizardStep1Component} from './components/wizards/struct-wizard/steps/create-struct-wizard-step1.component';
import {GenerateFinalCodePreviewComponent} from './components/preview/generate-final-code-preview.component';

export const routes: Routes = [
  { path: 'createEnum', component: CreateEnumWizardComponent, children: [
      {path:'', redirectTo: 'enum-step1/add', pathMatch: 'full'},
      {path: 'enum-step1/:mode', component: CreateEnumWizardStep1Component},
      {path: 'enum-step2', component: CreateEnumWizardStep2Component},
      {path: 'enum-step-confirm', component: CreateEnumWizardStepConfirmComponent}
    ]},
  { path: 'createUnion', component: CreateUnionWizardComponent, children: [
      {path:'', redirectTo: 'union-step1/add', pathMatch: 'full'},
      {path: 'union-step1/:mode', component: CreateUnionWizardStep1Component},
      {path: 'union-step2', component: CreateUnionWizardStep2Component},
      {path: 'union-step-confirm', component: CreateUnionWizardStepConfirmComponent}
    ]},
  { path: 'createStruct', component: CreateStructWizardComponent, children: [
      {path:'', redirectTo: 'struct-step1/add', pathMatch: 'full'},
      {path: 'struct-step1/:mode', component: CreateStructWizardStep1Component},
      {path: 'struct-step2', component: CreateStructWizardStep2Component},
      {path: 'struct-step-confirm', component: CreateStructWizardStepConfirmComponent}
    ]},
  { path: 'generate', component: GenerateFinalCodePreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
