import { TestBed } from '@angular/core/testing';

import { UseGuardService } from './use-guard.service';

describe('UseGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseGuardService = TestBed.get(UseGuardService);
    expect(service).toBeTruthy();
  });
});
