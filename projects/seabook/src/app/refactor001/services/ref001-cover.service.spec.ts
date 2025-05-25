import { TestBed } from '@angular/core/testing';

import { Ref001CoverService } from './ref001-cover.service';

describe('Ref001CoverService', () => {
  let service: Ref001CoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ref001CoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
