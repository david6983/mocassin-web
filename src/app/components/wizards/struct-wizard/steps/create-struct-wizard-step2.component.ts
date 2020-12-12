import { Component, OnInit } from '@angular/core';
import {StructAttribute} from '../../../../../domain/StructAttribute';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {StructWizardService} from '../../../../services/wizards/struct-wizard.service';
import {ModeService} from '../../../../services/wizards/mode-service';
import {ValidatorService} from '../../../../services/validator.service';
import {TypeEnum} from '../../../../../domain/TypeEnum';
import {Name} from '../../../../../domain/Name';
import {DataStructureService} from '../../../../services/data-structure.service';

@Component({
  selector: 'app-create-struct-wizard-step2',
  template: `
    <p-card>
      <ng-template pTemplate="title">
        Struct attributes
      </ng-template>
      <ng-template pTemplate="subtitle">
        Add your own attributes in the struct {{ displayedName }} with a unique and alphanumeric name
      </ng-template>
      <ng-template pTemplate="content">
        <div class="p-fluid">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-6">
              <label for="class">New attribute</label>
              <div class="p-fluid p-mt-2">
                <div class="p-field">
                  <label for="attributeName">Name</label>
                  <input #attributeName="ngModel" id="attributeName" pKeyFilter="alphanum" type="text" required pInputText [(ngModel)]="name"
                         [ngClass]="{'p-invalid': (attributeName.invalid && submitted) || (attributeName.dirty && attributeName.invalid)}">
                  <div>
                    <small class="p-error" *ngIf="(attributeName.invalid && submitted )|| (attributeName.dirty && attributeName.invalid)">Attribute
                      name is
                      required.</small>
                  </div>
                  <div>
                    <small *ngIf="isUniqueInDataStruct" class="p-error">The name is not unique in this struct</small>
                    <small *ngIf="isUnique && !isReserved" class="p-error">The name is not unique in the project scope (check the names of your data
                      below)</small>
                    <small *ngIf="isReserved && !isUniqueInDataStruct" class="p-error">This word is reserved (check in step 1)</small>
                  </div>
                </div>
                <div class="p-field">
                  <label for="type">Type</label>
                  <p-dropdown inputId="type" [(ngModel)]="selectedType" [options]="(types | async)"
                              placeholder="Select a type"></p-dropdown>
                </div>
                <div class="p-field-checkbox">
                  <p-checkbox id="isPointer" [binary]="true" [(ngModel)]="isPointer"></p-checkbox>
                  <label for="isPointer" class="p-checkbox-label">Is it a pointer ?</label>
                </div>
                <p-button label="Add" (onClick)="addAttribute()" [disabled]="!name || !selectedType"></p-button>
              </div>
            </div>
            <div class="p-field p-col-12 p-md-6">
              <label for="attribute" class="p-mb-2">Attributes</label>
              <div class="p-mt-3">
                <div *ngFor="let attr of attributes" class="p-card attributes-row p-d-flex p-jc-between">
                  <div>
                    <p-checkbox name="structs" value="checked" class="p-mr-2" [disabled]="true"></p-checkbox>
                    <span class="data-name p-mr-2">{{ attr.name }} ({{ attr.type }}{{ attr.isPointer ? '*' : ''}})</span>
                  </div>
                  <div>
                    <button pButton (click)="deleteAttribute(attr.name)" type="button" icon="pi pi-times"
                            class="p-button-rounded p-button-danger p-button-text"></button>
                  </div>
                </div>
                <small *ngIf="attributes.length === 0" class="p-error">No attributes</small>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="p-grid p-nogutter p-justify-between">
          <p-button label="Previous" (onClick)="previousPage()" icon="pi pi-angle-left" iconPos="left"
                    styleClass="p-button-warning"></p-button>
          <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [`
    .attributes-row {
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }

    .attributes-row:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class CreateStructWizardStep2Component implements OnInit {
  displayedName: string
  submitted: boolean = false;
  isUniqueInDataStruct: boolean = false;
  isUnique: boolean = false;
  isReserved: boolean = false;
  reservedWords: Observable<string[]>;
  names: Observable<Name[]>;
  name: string;
  selectedType: string;
  isPointer: boolean;
  attributes: StructAttribute[] = [];
  types: Observable<string[]>;

  constructor(private router: Router,
              private structWizardService: StructWizardService,
              private modeService: ModeService,
              private validator: ValidatorService,
              private dataStructureService: DataStructureService
  ) { }

  ngOnInit(): void {
    this.names = this.dataStructureService.getNames();
    this.reservedWords = this.validator.getReservedCWordsList();
    let wizardData = this.structWizardService.getStructWizardData();

    // redirect to the previous step if the name was not defined
    if (wizardData.name === undefined) {
      this.previousPage()
    } else {
      this.displayedName = wizardData.name;
      this.attributes = wizardData.attributes;
    }

    this.types = this.validator.getTypesList();
    console.log(this.selectedType);
  }

  nextPage() {
    this.router.navigate(['createStruct/struct-step-confirm']);
    this.submitted = true;
  }

  previousPage() {
    let mode = this.modeService.getMode();
    this.router.navigate(['createStruct/struct-step1/' + mode]);
  }

  addAttribute() {
    if (this.validator.isAttributeNameUnique(this.name, this.structWizardService.getStructWizardData(), TypeEnum.STRUCT)) {
      this.reservedWords.subscribe(words => {
        if (!this.validator.isReservedWord(this.name, words)) {
          this.names.subscribe(names => {
            if (!this.validator.isReservedWord(this.name, names.map(names => names.name))) {
              // update the form data
              this.attributes.push({id: undefined, name: this.name, type: this.selectedType, isPointer: this.isPointer})
              // reset form
              this.name = undefined;
              this.selectedType = undefined;
              this.isUnique = false;
            } else {
              this.isUnique = true;
            }
          })

          this.isReserved = false;
        } else {
          this.isReserved = true;
        }
      })

      this.isUniqueInDataStruct = false;
    } else {
      this.isUniqueInDataStruct = true;
    }
  }

  deleteAttribute(name: string) {
    const index: number = this.attributes.findIndex(c => c.name == name);
    this.attributes.splice(index, 1);
  }
}
