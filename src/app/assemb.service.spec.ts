import { TestBed } from '@angular/core/testing';

import { AssembService } from './assemb.service';

describe('AssembService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssembService = TestBed.get(AssembService);
    expect(service).toBeTruthy();
  });
});
