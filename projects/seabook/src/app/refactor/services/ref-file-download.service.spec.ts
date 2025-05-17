import { TestBed } from '@angular/core/testing';

import { RefFileDownloadService } from './ref-file-download.service';

describe('RefFileDownloadService', () => {
  let service: RefFileDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefFileDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
