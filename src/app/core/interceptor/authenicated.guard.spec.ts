import { TestBed } from '@angular/core/testing';

import { AuthenicatedGuard } from './authenicated.guard';

describe('AuthenicatedGuard', () => {
  let guard: AuthenicatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenicatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
