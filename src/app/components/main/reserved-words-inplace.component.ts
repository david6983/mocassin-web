import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reserved-words-inplace',
  template: `
    <p-inplace closable="true">
      <ng-template pTemplate="display">
        Show reserved words by the C language
      </ng-template>
      <ng-template pTemplate="content">
        <div>
          <span *ngFor="let word of (reservedWords | async)" class="p-tag p-tag-warning p-mr-2 p-mb-1">{{ word }}</span>
        </div>
      </ng-template>
    </p-inplace>
  `,
  styles: [`
    .p-tag {
      align-items: center;
      padding: 0.25rem;
      font-size: 10px;
    }
  `]
})
export class ReservedWordsInplaceComponent implements OnInit {
  @Input() reservedWords: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
