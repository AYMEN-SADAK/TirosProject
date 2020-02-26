import { TestBed } from '@angular/core/testing';

import { MauthentificationService } from './mauthentification.service';

describe('MauthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MauthentificationService = TestBed.get(MauthentificationService);
    expect(service).toBeTruthy();
  });
});
