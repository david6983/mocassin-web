import {Component, OnInit} from '@angular/core';
import {DataStructureService} from '../../services/data-structure.service';
import {Observable} from 'rxjs';
import {Enum} from '../../../domain/Enum';
import {Union} from '../../../domain/Union';
import {Struct} from '../../../domain/Struct';
import {MenuItem} from 'primeng/api';
import {CodeModel} from '@ngstack/code-editor';
import {RenderService} from '../../services/render.service';

@Component({
  selector: 'app-side-tree-view',
  template: `
    <p-accordion [multiple]="true">
      <p-accordionTab header="User Data Structures" [selected]="true">
        <p-accordion [multiple]="true">
          <p-accordionTab header="Enums" [selected]="true">
            <div>
              <app-tree-view-card *ngFor="let e of (enums | async)"
                [data]="e"
                type="enum"
                (previewEvent)="handlePreview(e, 'enum')"
              ></app-tree-view-card>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Unions" [selected]="true">
            <div>
              <app-tree-view-card *ngFor="let e of (unions | async)"
                [data]="e"
                type="union"
                (previewEvent)="handlePreview(e, 'union')"
              ></app-tree-view-card>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Struct" [selected]="true">
            <div>
              <app-tree-view-card *ngFor="let e of (structs | async)"
                [data]="e"
                type="struct"
                (previewEvent)="handlePreview(e, 'struct')"
              ></app-tree-view-card>
            </div>
          </p-accordionTab>
        </p-accordion>
      </p-accordionTab>
    </p-accordion>
    <p-dialog header="Code Preview"
      [(visible)]="displayPreview"
      *ngIf="codeModel"
      styleClass="code_dialog"
    >
      <app-ccode-editor
        [filename]="namePreview"
        [content]="contentPreview"
        [codeModel]="codeModel"
      ></app-ccode-editor>
    </p-dialog>
  `,
  styles: [`
    ::ng-deep .code_dialog {
      width: 40vw;
    }

    @media screen and (max-width: 60em) {
      ::ng-deep .code_dialog {
        width: 90vw;
      }
    }
  `]
})
export class TreeViewComponent implements OnInit {
  displayPreview: boolean = false;
  namePreview: string;
  contentPreview: string;
  codeModel: CodeModel;

  items: MenuItem[];

  enums: Observable<Enum[]>;
  unions: Observable<Union[]>;
  structs: Observable<Struct[]>;

  constructor(private dataStructureService: DataStructureService,
              private renderService: RenderService,
  ) {
    this.enums = this.dataStructureService.getEnums();
    this.unions = this.dataStructureService.getUnions();
    this.structs = this.dataStructureService.getStructs();
  }

  ngOnInit() {
  }

  private previewEnum(e: Enum) {
    this.renderService.renderEnum(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  private previewStruct(e: Struct) {
    this.renderService.renderStruct(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  private previewUnion(e: Union) {
    this.renderService.renderUnion(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  displayPreviewDialog(name: string, content: string) {
    this.contentPreview = content;
    this.codeModel = {
      language: 'c',
      uri: `${name}.c`,
      value: content,
    }
    this.namePreview = name;
    this.displayPreview = true;
  }

  handlePreview(data: Enum | Union | Struct, type: string) {
    if (type) {
      switch (type) {
        case "enum":
          this.previewEnum(<Enum> data)
          break;
        case "union":
          this.previewUnion(<Union> data)
          break;
        case "struct":
          this.previewStruct(<Struct> data)
          break;
      }
    }
  }
}
