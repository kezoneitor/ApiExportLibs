import { TestBed } from '@angular/core/testing';

import { LingsService } from './lings.service';

describe('LingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LingsService = TestBed.get(LingsService);
    expect(service).toBeTruthy();
  });
});
