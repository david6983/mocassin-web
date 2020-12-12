import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Union} from '../../../domain/Union';
import {Enum} from '../../../domain/Enum';
import {Struct} from '../../../domain/Struct';
import {TypeEnum} from '../../../domain/TypeEnum';
import {EnumWizardService} from '../../services/wizards/enum-wizard.service';
import {UnionWizardService} from '../../services/wizards/union-wizard.service';
import {StructWizardService} from '../../services/wizards/struct-wizard.service';
import {RenderService} from '../../services/render.service';
import {Router} from '@angular/router';
import {DataStructureService} from '../../services/data-structure.service';

@Component({
  selector: 'app-tree-view-card',
  template: `
    <div class="p-card data-row p-d-flex p-jc-between">
      <div>
        <p-checkbox name="unions" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
        <span class="data-name p-mr-2">{{ data.name }}</span>
      </div>
      <div>
        <button pButton type="button" (click)="preview()" label="Preview"></button>
        <button pButton type="button" (click)="edit()" label="Edit" class="p-button-warning p-mr-2 p-ml-2"></button>
        <button pButton type="button" (click)="delete()" label="Delete" class="p-button-danger"></button>
      </div>
    </div>
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
export class TreeViewCardComponent implements OnInit {
  @Input() data: Enum | Struct | Union;
  @Input() type: string = "";
  @Output() previewEvent: EventEmitter<{name: string, type: string}> = new EventEmitter();

  constructor(
    private dataStructureService: DataStructureService,
    private enumWizardService: EnumWizardService,
    private unionWizardService: UnionWizardService,
    private structWizardService: StructWizardService,
    private renderService: RenderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  preview() {
    if (this.type) {
      switch (this.type) {
        case "enum":
          this.previewEvent.emit({name: (<Enum> this.data).name, type: "enum"})
          break;
        case "union":
          this.previewEvent.emit({name: (<Union> this.data).name, type: "union"})
          break;
        case "struct":
          this.previewEvent.emit({name: (<Struct> this.data).name, type: "struct"})
          break;
      }
    }
  }

  edit() {
    if (this.type) {
      switch (this.type) {
        case "enum":
          this.enumWizardService.enumWizardData = <Enum> this.data;
          this.router.navigate(['/createEnum/enum-step1/edit']);
          break;
        case "union":
          this.unionWizardService.unionWizardData = <Union> this.data;
          this.router.navigate(['/createUnion/union-step1/edit']);
          break;
        case "struct":
          this.structWizardService.structWizardData = <Struct> this.data;
          this.router.navigate(['/createStruct/struct-step1/edit']);
          break;
      }
    }
  }

  delete() {
    if (this.type) {
      switch (this.type) {
        case "enum":
          this.dataStructureService.deleteDataStruct(<Enum> this.data, TypeEnum.ENUM);
          break;
        case "union":
          this.dataStructureService.deleteDataStruct(<Union> this.data, TypeEnum.UNION);
          break;
        case "struct":
          this.dataStructureService.deleteDataStruct(<Struct> this.data, TypeEnum.STRUCT);
          break;
      }
    }
  }
}
