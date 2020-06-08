import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistIssueDescComponent } from './specialist-issue-desc.component';

describe('SpecialistIssueDescComponent', () => {
  let component: SpecialistIssueDescComponent;
  let fixture: ComponentFixture<SpecialistIssueDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistIssueDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistIssueDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
