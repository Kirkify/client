import { TestBed } from '@angular/core/testing';

import { IsCoachGuard } from './is-coach.guard';

describe('IsCoachGuard', () => {
  let guard: IsCoachGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCoachGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
