import { TestBed } from '@angular/core/testing';

import { DebaoHientrangLineService } from './debao-hientrang-line.service';

describe('DebaoHientrangLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebaoHientrangLineService = TestBed.get(DebaoHientrangLineService);
    expect(service).toBeTruthy();
  });
});
