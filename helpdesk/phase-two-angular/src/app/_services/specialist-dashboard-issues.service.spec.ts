import { TestBed } from '@angular/core/testing';

import { SpecialistDashboardIssuesService } from './specialist-dashboard-issues.service';

describe('SpecialistDashboardIssuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialistDashboardIssuesService = TestBed.get(SpecialistDashboardIssuesService);
    expect(service).toBeTruthy();
  });
});
