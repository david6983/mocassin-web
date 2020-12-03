import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';

@Component({
  selector: 'app-side-tree-view',
  template: `
    <p-accordion [multiple]="true">
      <p-accordionTab header="User Data Structures" [selected]="true">
        Content 1
      </p-accordionTab>
      <p-accordionTab header="Generated Data Structures" [selected]="true">
        Content 2
      </p-accordionTab>
      <p-accordionTab header="C Files" [selected]="true">
        Content 3
      </p-accordionTab>
    </p-accordion>
  `,
  styles: [
  ]
})
export class SideTreeViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
