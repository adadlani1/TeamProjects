import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSolvedComponent } from './problem-solved.component';

describe('ProblemSolvedComponent', () => {
  let component: ProblemSolvedComponent;
  let fixture: ComponentFixture<ProblemSolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
