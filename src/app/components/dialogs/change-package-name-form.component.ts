import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataStructureService} from '../../services/data-structure.service';

@Component({
  selector: 'app-change-package-name-dialog',
  template: `
      <div>
        <input type="text" pInputText pKeyFilter="alphanum" [(ngModel)]="packageName" placeholder="enter a new name"/><br><br>
        <p-button label="Change" (click)="changePackageName()"></p-button>
      </div>
  `,
  styles: [
  ]
})
export class ChangePackageNameFormComponent implements OnInit {
  @Input() packageName: string;
  @Output() changedPackageName = new EventEmitter<string>();

  constructor(private dataService: DataStructureService) {}

  ngOnInit(): void {
  }

  changePackageName() {
    this.dataService.editPackageName(this.packageName);
    this.changedPackageName.emit(this.packageName);
  }
}
