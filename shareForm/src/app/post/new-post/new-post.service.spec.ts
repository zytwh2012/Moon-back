import { TestBed } from '@angular/core/testing';

import { NewPostService } from './new-post.service';

describe('NewPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPostService = TestBed.get(NewPostService);
    expect(service).toBeTruthy();
  });
});
