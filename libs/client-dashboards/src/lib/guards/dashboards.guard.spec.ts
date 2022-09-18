import { TestBed } from '@angular/core/testing';

import { AppDashboardsGuard } from './dashboards.guard';

describe('AppDashboardsGuard', () => {
  let guard: AppDashboardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppDashboardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
