import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingIssuesComponent } from './existing-issues.component';

describe('ExistingIssuesComponent', () => {
  let component: ExistingIssuesComponent;
  let fixture: ComponentFixture<ExistingIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
