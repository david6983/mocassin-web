import { Component, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-home-cards',
  template: `
    <div class="p-grid">
      <div class="p-col" style="width:100px">
        <p-card header="Create" subheader="Card Subheader" styleClass="p-card-shadow ">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
          <ng-template pTemplate="footer">
            <p-button label="Save" icon="pi pi-check"></p-button>
          </ng-template>
        </p-card>
      </div>
      <div class="p-col" style="width:100px">
        <p-card header="Create" subheader="Card Subheader" styleClass="p-card-shadow ">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
          <ng-template pTemplate="footer">
            <p-button label="Save" icon="pi pi-check"></p-button>
          </ng-template>
        </p-card>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HomeCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
