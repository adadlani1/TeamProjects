import { TestBed } from '@angular/core/testing';

import { ExistingIssuesService } from './existing-issues.service';

describe('ExistingIssuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExistingIssuesService = TestBed.get(ExistingIssuesService);
    expect(service).toBeTruthy();
  });
});
