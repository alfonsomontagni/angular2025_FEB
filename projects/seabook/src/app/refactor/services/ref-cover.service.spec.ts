import { TestBed } from '@angular/core/testing';

import { RefCoverService } from './ref-cover.service';

describe('RefCoverService', () => {
  let service: RefCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
