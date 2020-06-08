import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarIssueFormComponent } from './similar-issue-form.component';

describe('SimilarIssueFormComponent', () => {
  let component: SimilarIssueFormComponent;
  let fixture: ComponentFixture<SimilarIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
