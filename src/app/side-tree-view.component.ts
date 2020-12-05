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
              <div *ngFor="let e of (enums | async)" class="p-card data-row p-d-flex p-jc-between">
                <div>
                  <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                  <span class="data-name p-mr-2">{{ e.name }}</span>
                </div>
                <div>
                  <button pButton type="button" label="Preview"></button>
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
                  <button pButton type="button" label="Preview"></button>
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
                  <button pButton type="button" label="Preview"></button>
                  <button pButton type="button" label="Edit" class="p-button-warning p-mr-2 p-ml-2"></button>
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
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
    }

    .data-row:hover {
      background-color: #f1f1f1;
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
