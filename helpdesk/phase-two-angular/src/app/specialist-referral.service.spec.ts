import { TestBed } from '@angular/core/testing';

import { SpecialistReferralService } from './specialist-referral.service';

describe('SpecialistReferralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialistReferralService = TestBed.get(SpecialistReferralService);
    expect(service).toBeTruthy();
  });
});
