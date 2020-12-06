import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {DataStructureService} from './data-structure.service';

@Component({
  selector: 'app-menu-bar',
  template: `
    <p-menubar [model]="items">
      <ng-template pTemplate="start">
        <img src="../assets/logos/mocassin.svg" height="40" alt="mocassin logo">
      </ng-template>
      <ng-template pTemplate="end">
        <div class="package-name-text">
          {{ packageName }}
        </div>
      </ng-template>
    </p-menubar>
  `,
  styles: [`
    .package-name-text {
      color: saddlebrown;
    }
  `]
})
export class MenuBarComponent implements OnInit {
  @Input() title;
  @Input() packageName;
  @Output() displayPackageDialog = new EventEmitter();
  items: MenuItem[];

  constructor(private router: Router
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.title,
        disabled: true
      },
      {
        label: 'New',
        items: [
          {label: 'Enum', command: _ => this.createEnum()},
          {label: 'Struct', command: _ => this.createStruct()},
          {label: 'Union', command: _ => this.createUnion()}
        ]
      },
      {
        label: 'Preferences',
        items: [
          {label: 'Change package name', command: _ => this.changePackageName()}
        ]
      },
      { label: 'Source', command: _ => this.help() }
    ];
  }

  createSList(): void {
    console.log('create SList');
  }

  createEnum(): void {
    this.router.navigate(['/createEnum']);
  }

  createStruct(): void {
    this.router.navigate(['/createStruct']);
  }

  createUnion(): void {
    this.router.navigate(['/createUnion']);
  }

  changePackageName(): void {
    this.displayPackageDialog.emit(true);
  }

  help(): void {
    window.open('https://github.com/david6983/mocassin-web', "_blank")
  }
}
