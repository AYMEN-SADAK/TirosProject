import { TestBed } from '@angular/core/testing';

import { PoseurService } from './poseur.service';

describe('PoseurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoseurService = TestBed.get(PoseurService);
    expect(service).toBeTruthy();
  });
});
