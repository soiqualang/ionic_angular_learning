import { TestBed } from '@angular/core/testing';

import { CongHientrangPointService } from './cong-hientrang-point.service';

describe('CongHientrangPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CongHientrangPointService = TestBed.get(CongHientrangPointService);
    expect(service).toBeTruthy();
  });
});
