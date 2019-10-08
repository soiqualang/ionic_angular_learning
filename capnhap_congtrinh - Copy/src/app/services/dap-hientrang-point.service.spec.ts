import { TestBed } from '@angular/core/testing';

import { DapHientrangPointService } from './dap-hientrang-point.service';

describe('DapHientrangPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DapHientrangPointService = TestBed.get(DapHientrangPointService);
    expect(service).toBeTruthy();
  });
});
