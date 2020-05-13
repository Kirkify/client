import { TestBed } from '@angular/core/testing';

import { InterestedInService } from './interested-in.service';

describe('InterestedInService', () => {
  let service: InterestedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
