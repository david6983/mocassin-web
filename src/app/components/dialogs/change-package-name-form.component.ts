import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataStructureService} from '../../services/data-structure.service';
import {Observable} from 'rxjs';
import {ValidatorService} from '../../services/validator.service';
import {Name} from '../../../domain/Name';

@Component({
  selector: 'app-change-package-name-dialog',
  template: `
      <div>
        <input #name="ngModel" type="text" pInputText pKeyFilter="alphanum" required [(ngModel)]="packageName" placeholder="enter a new name"/>
        <div>
          <small *ngIf="(name.invalid && submitted) || (name.dirty && name.invalid)" class="p-error">The name is required.</small>
        </div>
        <div>
          <small *ngIf="isUnique" class="p-error">The name is not unique in the project scope (check the names of your data below)</small>
          <small *ngIf="isReserved" class="p-error">This word is reserved (check in the list below)</small>
        </div>
        <div class="p-mt-2 p-mb-2"><app-reserved-words-inplace [reservedWords]="reservedWords"></app-reserved-words-inplace></div>
        <br>
        <p-button label="Change" (click)="changePackageName()"></p-button>
      </div>
  `,
  styles: [
  ]
})
export class ChangePackageNameFormComponent implements OnInit {
  @Input() packageName: string;
  @Output() changedPackageName = new EventEmitter<string>();
  submitted: boolean = false;
  isReserved: boolean = false;
  isUnique: boolean = false;
  reservedWords: Observable<string[]>;
  names: Observable<Name[]>;

  constructor(
    private dataStructureService: DataStructureService,
    private validator: ValidatorService
  ) {}

  ngOnInit(): void {
    this.reservedWords = this.validator.getReservedCWordsList();
    this.names = this.dataStructureService.getNames();
  }

  changePackageName() {
    this.reservedWords.subscribe(words => {
      if (!this.validator.isReservedWord(this.packageName, words)) {
        this.names.subscribe(names => {
          if (!this.validator.isReservedWord(this.packageName, names.map(names => names.name))) {
            this.dataStructureService.editPackageName(this.packageName);
            this.changedPackageName.emit(this.packageName);
            this.submitted = true;
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
  }
}
