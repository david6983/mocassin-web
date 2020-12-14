import { Injectable } from '@angular/core';
import {Enum} from '../../domain/Enum';
import {Observable, of} from 'rxjs';
import {Union} from '../../domain/Union';
import {Struct} from '../../domain/Struct';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  finalRender: string[] = [];
  constructor() { }

  private handleRenderRes = res => {
    this.finalRender.push(res)
    this.finalRender.push("\n\n")
  }

  renderEnum(e: Enum): Observable<string> {
    let out = [];
    out.push(`typedef enum ${e.name} {\n`);
    e.attributes.forEach(attr => {
      out.push(`\t${attr.name} = ${attr.value},\n`)
    });
    out.push(`} ${e.name};`)
    return of(out.join(""))
  }

  renderUnion(e: Union): Observable<string> {
    let out = [];
    out.push(`typedef union ${e.name} {\n`);
    e.attributes.forEach(attr => {
      let ptr = attr.isPointer ? "*" : "";
      out.push(`\t${attr.type}${ptr} ${attr.name};\n`)
    });
    out.push(`} ${e.name};`)
    return of(out.join(""))
  }

  renderStruct(e: Struct): Observable<string> {
    let out = [];
    if (e.isDisplayFunctionGenerated) {
      out.push("// display function will be generated \n");
    }
    out.push(`typedef struct ${e.name} {\n`);
    e.attributes.forEach(attr => {
      let ptr = attr.isPointer ? "*" : "";
      out.push(`\t${attr.type}${ptr} ${attr.name};\n`)
    });
    out.push(`} ${e.name};`)
    return of(out.join(""))
  }

  addHeader(packageName: string) {
    this.finalRender.push("#ifndef ", packageName + "\n", "#define ", packageName + "\n\n")
  }

  addFooter(packageName: string) {
    this.finalRender.push("#endif /* ", packageName + " */\n")
  }

  renderDataStructures(enums: Enum[], unions: Union[], structs: Struct[]) {
    enums.forEach(e => {
      this.renderEnum(e).subscribe(res => this.handleRenderRes(res))
    })
    unions.forEach(u => {
      this.renderUnion(u).subscribe(res => this.handleRenderRes(res))
    })
    structs.forEach(s => {
      this.renderStruct(s).subscribe(res => this.handleRenderRes(res))
    })
  }

  generate(packageName: string, enums: Enum[], unions: Union[], structs: Struct[]): string {
    this.finalRender = [];
    this.addHeader(packageName);
    this.renderDataStructures(enums, unions, structs);
    this.addFooter(packageName);
    return this.finalRender.join("")
  }
}
