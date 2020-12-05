import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataStructureService} from './data-structure.service';

@Component({
  selector: 'app-change-package-name-dialog',
  template: `
    <p-dialog header="Change package name" [(visible)]="display">
      <input type="text" pInputText [(ngModel)]="packageName" placeholder="enter a new name"/><br><br>
      <p-button label="Change" (click)="changePackageName()"></p-button>
    </p-dialog>
  `,
  styles: [
  ]
})
export class ChangePackageNameDialogComponent implements OnInit {
  packageName;
  @Input() display: boolean = false;
  @Output() changedPackageName = new EventEmitter<string>();

  constructor(private dataService: DataStructureService) {}

  ngOnInit(): void {
  }

  changePackageName() {
    this.dataService.editPackageName(this.packageName);
    this.changedPackageName.emit();
    this.display = false;
  }
}
