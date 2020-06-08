import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIssueContentComponent } from './new-issue-content.component';

describe('NewIssueContentComponent', () => {
  let component: NewIssueContentComponent;
  let fixture: ComponentFixture<NewIssueContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
