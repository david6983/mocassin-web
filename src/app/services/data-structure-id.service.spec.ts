import { TestBed } from '@angular/core/testing';

import { DataStructureIdService } from './data-structure-id.service';

describe('DataStructureIdService', () => {
  let service: DataStructureIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: []});
    service = TestBed.inject(DataStructureIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
