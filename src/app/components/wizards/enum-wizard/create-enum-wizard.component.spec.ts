import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnumWizardComponent } from './create-enum-wizard.component';

describe('CreateEnumFormComponent', () => {
  let component: CreateEnumWizardComponent;
  let fixture: ComponentFixture<CreateEnumWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnumWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnumWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
