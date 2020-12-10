import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import {MenuBarComponent} from './components/main/menu-bar.component';
import {ToolBarComponent} from './components/main/tool-bar.component';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import { TreeViewComponent } from './components/main/tree-view.component';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreateEnumWizardComponent } from './components/wizards/enum-wizard/create-enum-wizard.component';
import {CodeEditorModule} from '@ngstack/code-editor';
import { CCodeEditorComponent } from './components/dialogs/ccode-editor.component';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ChangePackageNameFormComponent } from './components/dialogs/change-package-name-form.component';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard'
import {StepsModule} from 'primeng/steps';
import { CreateEnumWizardStep1Component } from './components/wizards/enum-wizard/steps/create-enum-wizard-step1.component';
import { CreateEnumWizardStep2Component } from './components/wizards/enum-wizard/steps/create-enum-wizard-step2.component';
import { CreateEnumWizardStepConfirmComponent } from './components/wizards/enum-wizard/steps/create-enum-wizard-step-confirm.component';
import { CreateUnionWizardStep1Component } from './components/wizards/union-wizard/steps/create-union-wizard-step1.component';
import { CreateUnionWizardStep2Component } from './components/wizards/union-wizard/steps/create-union-wizard-step2.component';
import { CreateUnionWizardStepConfirmComponent } from './components/wizards/union-wizard/steps/create-union-wizard-step-confirm.component';
import { CreateStructWizardStepConfirmComponent } from './components/wizards/struct-wizard/steps/create-struct-wizard-step-confirm.component';
import { CreateStructWizardStep1Component } from './components/wizards/struct-wizard/steps/create-struct-wizard-step1.component';
import { CreateStructWizardStep2Component } from './components/wizards/struct-wizard/steps/create-struct-wizard-step2.component';
import { CreateStructWizardComponent } from './components/wizards/struct-wizard/create-struct-wizard.component';
import { CreateUnionWizardComponent } from './components/wizards/union-wizard/create-union-wizard.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ToolBarComponent,
    TreeViewComponent,
    CreateEnumWizardComponent,
    CCodeEditorComponent,
    ChangePackageNameFormComponent,
    CreateEnumWizardStep1Component,
    CreateEnumWizardStep2Component,
    CreateEnumWizardStepConfirmComponent,
    CreateUnionWizardStep1Component,
    CreateUnionWizardStep2Component,
    CreateUnionWizardStepConfirmComponent,
    CreateStructWizardStepConfirmComponent,
    CreateStructWizardStep1Component,
    CreateStructWizardStep2Component,
    CreateStructWizardComponent,
    CreateUnionWizardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    SharedModule,
    ToolbarModule,
    AccordionModule,
    BrowserAnimationsModule,
    CodeEditorModule.forRoot(),
    PanelModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    CardModule,
    CheckboxModule,
    ClipboardModule,
    StepsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
