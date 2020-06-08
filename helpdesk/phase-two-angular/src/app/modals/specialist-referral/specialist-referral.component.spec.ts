import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistReferralComponent } from './specialist-referral.component';

describe('SpecialistReferralComponent', () => {
  let component: SpecialistReferralComponent;
  let fixture: ComponentFixture<SpecialistReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
