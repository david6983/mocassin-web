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

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ToolBarComponent,
    SideTreeViewComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
