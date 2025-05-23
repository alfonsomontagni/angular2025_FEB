import { TestBed } from '@angular/core/testing';

import { LocalBookService } from './local-book.service';

describe('LocalBookService', () => {
  let service: LocalBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
