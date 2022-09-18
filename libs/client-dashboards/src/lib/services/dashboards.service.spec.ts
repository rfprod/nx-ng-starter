import { TestBed } from '@angular/core/testing';

import { AppDashboardsService } from './dashboards.service';

describe('AppDashboardsService', () => {
  let service: AppDashboardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDashboardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
