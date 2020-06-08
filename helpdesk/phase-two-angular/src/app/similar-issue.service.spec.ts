import { TestBed } from '@angular/core/testing';

import { SimilarIssueService } from './similar-issue.service';

describe('SimilarIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimilarIssueService = TestBed.get(SimilarIssueService);
    expect(service).toBeTruthy();
  });
});
