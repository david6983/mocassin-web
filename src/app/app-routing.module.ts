import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEnumFormComponent} from './create-enum-form.component';
import {CreateUnionFormComponent} from './create-union-form.component';
import {CreateStructFormComponent} from './create-struct-form.component';
import {CCodeEditorComponent} from './ccode-editor.component';

const routes: Routes = [
  { path: 'createEnum', component: CreateEnumFormComponent },
  { path: 'createUnion', component: CreateUnionFormComponent },
  { path: 'createStruct', component: CreateStructFormComponent },
  { path: 'editor', component: CCodeEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
