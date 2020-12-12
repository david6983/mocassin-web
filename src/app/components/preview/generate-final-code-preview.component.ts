import { Component, OnInit } from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {DataStructureService} from '../../services/data-structure.service';
import {RenderService} from '../../services/render.service';

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
  codeModel: CodeModel;

  constructor(
    private dataStructureService: DataStructureService,
    private renderService: RenderService
  ) { }

  ngOnInit(): void {
    this.handleGenerate()
  }

  handleGenerate(): void {
    this.dataStructureService.getEnums().subscribe(enums => {
      this.dataStructureService.getUnions().subscribe(unions => {
        this.dataStructureService.getStructs().subscribe(structs => {
          this.dataStructureService.getPackageName().subscribe(packageName => {
            this.generateContentPreview = this.renderService.generate(packageName, enums, unions, structs);
            this.codeModel = {
              language: 'c',
              uri: `${packageName}.c`,
              value: this.generateContentPreview,
            }
            this.finalFilename = `${packageName}.c`;
          })
        })
      })
    })
  }
}
