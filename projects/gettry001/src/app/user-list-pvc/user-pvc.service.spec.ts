import { TestBed } from '@angular/core/testing';

import { UserPvcService } from './user-pvc.service';

describe('UserPvcService', () => {
  let service: UserPvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
