import { TestBed } from '@angular/core/testing';

import { FillGridService } from './fill-grid.service';

describe('FillGridService', () => {
  let service: FillGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
