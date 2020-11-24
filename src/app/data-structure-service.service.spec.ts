import { TestBed } from '@angular/core/testing';

import { DataStructureServiceService } from './data-structure-service.service';

describe('DataStructureServiceService', () => {
  let service: DataStructureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStructureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
