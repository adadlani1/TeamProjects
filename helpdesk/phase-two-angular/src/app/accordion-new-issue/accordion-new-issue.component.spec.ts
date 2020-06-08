import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionNewIssueComponent } from './accordion-new-issue.component';

describe('AccordionNewIssueComponent', () => {
  let component: AccordionNewIssueComponent;
  let fixture: ComponentFixture<AccordionNewIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionNewIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionNewIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
