import { TestBed } from '@angular/core/testing';

import { RefBookService } from './ref-book.service';

describe('RefBookService', () => {
  let service: RefBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
