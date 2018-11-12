import { TestBed } from '@angular/core/testing';

import { RegistrareService } from './registrate.service';

describe('LoginandregService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrareService = TestBed.get(RegistrareService);
    expect(service).toBeTruthy();
  });
});
