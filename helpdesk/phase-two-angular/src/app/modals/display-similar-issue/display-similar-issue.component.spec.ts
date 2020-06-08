import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySimilarIssueComponent } from './display-similar-issue.component';

describe('DisplaySimilarIssueComponent', () => {
  let component: DisplaySimilarIssueComponent;
  let fixture: ComponentFixture<DisplaySimilarIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySimilarIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySimilarIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
