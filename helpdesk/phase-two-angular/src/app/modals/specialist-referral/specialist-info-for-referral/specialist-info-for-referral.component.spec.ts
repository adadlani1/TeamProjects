import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistInfoForReferralComponent } from './specialist-info-for-referral.component';

describe('SpecialistInfoForReferralComponent', () => {
  let component: SpecialistInfoForReferralComponent;
  let fixture: ComponentFixture<SpecialistInfoForReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistInfoForReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistInfoForReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
