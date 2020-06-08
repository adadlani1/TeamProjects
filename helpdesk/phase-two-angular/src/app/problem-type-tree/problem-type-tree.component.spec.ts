import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTypeTreeComponent } from './problem-type-tree.component';

describe('ProblemTypeTreeComponent', () => {
  let component: ProblemTypeTreeComponent;
  let fixture: ComponentFixture<ProblemTypeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemTypeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemTypeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
