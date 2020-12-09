import {Component, OnInit} from '@angular/core';
import {DataStructureService} from '../../services/data-structure.service';
import {Observable} from 'rxjs';
import {Enum} from '../../../domain/Enum';
import {Union} from '../../../domain/Union';
import {Struct} from '../../../domain/Struct';
import {MenuItem} from 'primeng/api';
import {TypeEnum} from '../../../domain/TypeEnum';
import {CodeModel} from '@ngstack/code-editor';

@Component({
  selector: 'app-side-tree-view',
  template: `
    <p-accordion [multiple]="true">
      <p-accordionTab header="User Data Structures" [selected]="false">
        <p-accordion [multiple]="true">
          <p-accordionTab header="Enums" [selected]="true">
            <div>
              <div *ngFor="let e of (enums | async)" class="p-card data-row p-d-flex p-jc-between">
                <div>
                  <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                  <span class="data-name p-mr-2">{{ e.name }}</span>
                </div>
                <div>
                  <button pButton type="button" (click)="previewEnum(e)" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning p-mr-2 p-ml-2"></button>
                  <button pButton type="button" (click)="deleteEnum(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Unions" [selected]="true">
            <div>
              <div *ngFor="let e of (unions | async)" class="p-card data-row p-d-flex p-jc-between">
                <div>
                  <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                  <span class="data-name p-mr-2">{{ e.name }}</span>
                </div>
                <div>
                  <button pButton type="button" (click)="previewUnion(e)" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning p-mr-2 p-ml-2"></button>
                  <button pButton type="button" (click)="deleteUnion(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Struct" [selected]="true">
            <div>
              <div *ngFor="let e of (structs | async)" class="p-card data-row p-d-flex p-jc-between">
                <div>
                  <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                  <span class="data-name p-mr-2">{{ e.name }}</span>
                </div>
                <div>
                  <button pButton type="button" (click)="previewStruct(e)" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning p-mr-2 p-ml-2"></button>
                  <button pButton type="button" (click)="deleteStruct(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
        </p-accordion>
      </p-accordionTab>
    </p-accordion>
    <p-dialog header="Code Preview"
              [(visible)]="displayPreview"
              *ngIf="codeModel"
              styleClass="code_dialog">
      <app-ccode-editor
        [filename]="namePreview"
        [content]="contentPreview"
        [codeModel]="codeModel"
      ></app-ccode-editor>
    </p-dialog>
  `,
  styles: [`
    .data-row {
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
    }

    .data-row:hover {
      background-color: #f1f1f1;
    }

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
export class SideTreeViewComponent implements OnInit {
  displayPreview: boolean = false;
  namePreview: string;
  contentPreview: string;
  codeModel: CodeModel;

  items: MenuItem[];

  enums: Observable<Enum[]>;
  unions: Observable<Union[]>;
  structs: Observable<Struct[]>;

  constructor(private dataStructureService: DataStructureService) {
    this.enums = this.dataStructureService.getEnums();
    this.unions = this.dataStructureService.getUnions();
    this.structs = this.dataStructureService.getStructs();
  }

  ngOnInit() {
  }

  deleteEnum(e: Enum) {
    this.dataStructureService.deleteDataStruct(e, TypeEnum.ENUM);
  }

  deleteUnion(e: Union) {
    this.dataStructureService.deleteDataStruct(e, TypeEnum.UNION);
  }

  deleteStruct(e: Struct) {
    this.dataStructureService.deleteDataStruct(e, TypeEnum.STRUCT);
  }

  previewEnum(e: Enum) {
    this.dataStructureService.renderEnum(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  previewStruct(e: Struct) {
    this.dataStructureService.renderStruct(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  previewUnion(e: Union) {
    this.dataStructureService.renderUnion(e).subscribe(value => {
      this.displayPreviewDialog(e.name, value)
    })
  }

  displayPreviewDialog(name: string, content: string) {
    this.contentPreview = content;
    this.codeModel = {
      language: 'c',
      uri: 'main.c',
      value: content,
    }
    this.namePreview = name;
    this.displayPreview = true;
  }
}
