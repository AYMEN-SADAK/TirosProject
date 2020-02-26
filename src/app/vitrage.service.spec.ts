import { TestBed } from '@angular/core/testing';

import { VitrageService } from './vitrage.service';

describe('VitrageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VitrageService = TestBed.get(VitrageService);
    expect(service).toBeTruthy();
  });
});
