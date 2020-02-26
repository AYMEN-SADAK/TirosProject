import { TestBed } from '@angular/core/testing';

import { SproductsService } from './sproducts.service';

describe('SproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SproductsService = TestBed.get(SproductsService);
    expect(service).toBeTruthy();
  });
});
