import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarIssueComponent } from './similar-issue.component';

describe('SimilarIssueComponent', () => {
  let component: SimilarIssueComponent;
  let fixture: ComponentFixture<SimilarIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
