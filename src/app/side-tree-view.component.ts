import {Component, OnInit} from '@angular/core';
import {DataStructureService} from './data-structure.service';
import {Observable} from 'rxjs';
import {Enum} from '../domain/Enum';
import {Union} from '../domain/Union';
import {Struct} from '../domain/Struct';
import {MenuItem} from 'primeng/api';
import {TypeEnum} from '../domain/TypeEnum';

@Component({
  selector: 'app-side-tree-view',
  template: `
    <p-accordion [multiple]="true">
      <p-accordionTab header="User Data Structures" [selected]="true">
        <p-accordion [multiple]="true">
          <p-accordionTab header="Enums" [selected]="true">
            <div>
              <div *ngFor="let e of (enums | async)" class="data-row">
                <span class="data-name">{{ e.name }}</span>
                <div>
                  <button pButton type="button" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning"></button>
                  <button pButton type="button" (click)="deleteEnum(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Unions" [selected]="true">
            <div>
              <div *ngFor="let e of (unions | async)" class="data-row">
                <span class="data-name">{{ e.name }}</span>
                <div>
                  <button pButton type="button" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning"></button>
                  <button pButton type="button" (click)="deleteUnion(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
          <p-accordionTab header="Struct" [selected]="true">
            <div>
              <div *ngFor="let e of (structs | async)" class="data-row">
                <span class="data-name">{{ e.name }}</span>
                <div>
                  <button pButton type="button" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning"></button>
                  <button pButton type="button" (click)="deleteStruct(e)" label="Delete" class="p-button-danger"></button>
                </div>
              </div>
            </div>
          </p-accordionTab>
        </p-accordion>
      </p-accordionTab>
    </p-accordion>
  `,
  styles: [`
    .data-row {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
  `]
})
export class SideTreeViewComponent implements OnInit {
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
}
