import { TestBed } from '@angular/core/testing';

import { AluService } from './alu.service';

describe('AluService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AluService = TestBed.get(AluService);
    expect(service).toBeTruthy();
  });
});
