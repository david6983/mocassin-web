import { Component, OnInit } from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {DataStructureService} from '../../services/data-structure.service';

@Component({
  selector: 'app-generate-final-code-preview',
  template: `
    <app-final-code-editor
      [filename]="finalFilename"
      [content]="generateContentPreview"
      [codeModel]="codeModel"
    ></app-final-code-editor>
  `,
  styles: []
})
export class GenerateFinalCodePreviewComponent implements OnInit {
  finalFilename: string;
  generateContentPreview: string;
  private finalRender: string[] = []
  codeModel: CodeModel;

  constructor(private dataStructureService: DataStructureService) { }

  ngOnInit(): void {
    this.handleGenerate()
  }

  private handleRenderRes = res => {
    this.finalRender.push(res)
    this.finalRender.push("\n\n")
  }

  handleGenerate(): void {
    this.dataStructureService.getEnums().subscribe(enums => {
      this.dataStructureService.getUnions().subscribe(unions => {
        this.dataStructureService.getStructs().subscribe(structs => {
          this.dataStructureService.getPackageName().subscribe(packageName => {
            this.finalRender.push("#ifndef ", packageName + "\n", "#define ", packageName + "\n\n")
            enums.forEach(e => {
              this.dataStructureService.renderEnum(e).subscribe(res => this.handleRenderRes(res))
            })
            unions.forEach(u => {
              this.dataStructureService.renderUnion(u).subscribe(res => this.handleRenderRes(res))
            })
            structs.forEach(s => {
              this.dataStructureService.renderStruct(s).subscribe(res => this.handleRenderRes(res))
            })
            this.finalRender.push("#endif /* ", packageName + " */\n")
            this.generateContentPreview = this.finalRender.join("");
            this.codeModel = {
              language: 'c',
              uri: 'main.c',
              value: this.generateContentPreview,
            }
            this.finalFilename = `${packageName}.c`;
          })
        })
      })
    })
  }
}
