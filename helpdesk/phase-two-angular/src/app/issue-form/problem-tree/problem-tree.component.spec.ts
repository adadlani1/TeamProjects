import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTreeComponent } from './problem-tree.component';

describe('ProblemTreeComponent', () => {
  let component: ProblemTreeComponent;
  let fixture: ComponentFixture<ProblemTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
