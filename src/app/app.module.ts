import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import {MenuBarComponent} from './menu-bar.component';
import {ToolBarComponent} from './tool-bar.component';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import { SideTreeViewComponent } from './side-tree-view.component';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreateEnumFormComponent } from './create-enum-form.component';
import { CreateUnionFormComponent } from './create-union-form.component';
import { CreateStructFormComponent } from './create-struct-form.component';
import {CodeEditorModule} from '@ngstack/code-editor';
import { CCodeEditorComponent } from './ccode-editor.component';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ChangePackageNameDialogComponent } from './change-package-name-dialog.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ToolBarComponent,
    SideTreeViewComponent,
    CreateEnumFormComponent,
    CreateUnionFormComponent,
    CreateStructFormComponent,
    CCodeEditorComponent,
    ChangePackageNameDialogComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
