import { TestBed } from '@angular/core/testing';

import { Ref001FileDownloadService } from './ref001-file-download.service';

describe('Ref001FileDownloadService', () => {
  let service: Ref001FileDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ref001FileDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
