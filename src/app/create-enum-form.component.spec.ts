import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnumFormComponent } from './create-enum-form.component';

describe('CreateEnumFormComponent', () => {
  let component: CreateEnumFormComponent;
  let fixture: ComponentFixture<CreateEnumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnumFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
