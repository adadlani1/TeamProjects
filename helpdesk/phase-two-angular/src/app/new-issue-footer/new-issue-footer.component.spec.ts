import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIssueFooterComponent } from './new-issue-footer.component';

describe('NewIssueFooterComponent', () => {
  let component: NewIssueFooterComponent;
  let fixture: ComponentFixture<NewIssueFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
