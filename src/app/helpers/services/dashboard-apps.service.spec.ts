import { TestBed } from '@angular/core/testing';

import { DashboardAppsService } from './dashboard-apps.service';

describe('DashboardAppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardAppsService = TestBed.get(DashboardAppsService);
    expect(service).toBeTruthy();
  });
});
