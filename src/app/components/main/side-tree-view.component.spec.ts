import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTreeViewComponent } from './side-tree-view.component';

describe('SideTreeViewComponent', () => {
  let component: SideTreeViewComponent;
  let fixture: ComponentFixture<SideTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
