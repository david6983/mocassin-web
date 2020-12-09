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
import { SideTreeViewComponent } from './components/main/side-tree-view.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ToolBarComponent,
    SideTreeViewComponent,
    CreateEnumWizardComponent,
    CCodeEditorComponent,
    ChangePackageNameFormComponent,
    CreateEnumWizardStep1Component,
    CreateEnumWizardStep2Component,
    CreateEnumWizardStepConfirmComponent,
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
    StepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
