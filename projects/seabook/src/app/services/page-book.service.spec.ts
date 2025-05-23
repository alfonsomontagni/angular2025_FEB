import { TestBed } from '@angular/core/testing';

import { PageBookService } from './page-book.service';

describe('PageBookService', () => {
  let service: PageBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
