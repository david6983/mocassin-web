import {Component, Input, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  template: `
    <p-menubar [model]="items">
      <ng-template pTemplate="start">
        <img src="../assets/logos/mocassin.svg" height="40" alt="mocassin logo">
      </ng-template>
    </p-menubar>
  `,
  styles: []
})
export class MenuBarComponent implements OnInit {
  @Input() title;
  items: MenuItem[];

  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: this.title,
        disabled: true
      },
      {
        label: 'File',
        items: [
          {label: 'New Project', command: _ => this.newProject()},
          {label: 'Open from computer', command: _ => this.openFromComputer()},
          {label: 'Save project locally', command: _ => this.saveProjectLocally()},
          {label: 'Generate', command: _ => this.generate()}
        ],
      },
      {
        label: 'Generate',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'SList', command: _ => this.createSList()},
          {label: 'DList', disabled: true},
          {label: 'BTree', disabled: true},
          {label: 'BSTree', disabled: true},
          {label: 'Tree', disabled: true},
          {label: 'QuadTree', disabled: true},
          {label: 'R-Tree', disabled: true},
          {label: 'Graph', disabled: true},
          {label: 'Hash table', disabled: true},
        ],
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
          {label: 'Change package name', command: _ => this.changePackageName()},
          {label: 'Change language', command: _ => this.changeLanguage()},
        ]
      },
      { label: 'Help', command: _ => this.help() }
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
    console.log('change package name');
  }

  changeLanguage(): void {
    console.log('change language');
  }

  newProject(): void {
    console.log('new project');
  }

  openFromComputer(): void {
    console.log('open from computer');
  }

  saveProjectLocally(): void {
    console.log('save project locally');
  }

  generate(): void {
    console.log('generate');
  }

  help(): void {
    console.log('open in a new tab the documentation or github wiki');
  }
}
