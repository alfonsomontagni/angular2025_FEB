import { TestBed } from '@angular/core/testing';

import { Ref001BookService } from './ref001-book.service';

describe('Ref001BookService', () => {
  let service: Ref001BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ref001BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
