import { TestBed } from '@angular/core/testing';

import { NewIssueService } from './new-issue.service';

describe('NewIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewIssueService = TestBed.get(NewIssueService);
    expect(service).toBeTruthy();
  });
});
