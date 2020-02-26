import { TestBed } from '@angular/core/testing';

import { AllServService } from './all-serv.service';

describe('AllServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllServService = TestBed.get(AllServService);
    expect(service).toBeTruthy();
  });
});
