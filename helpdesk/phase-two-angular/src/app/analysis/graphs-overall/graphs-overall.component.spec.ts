import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsOverallComponent } from './graphs-overall.component';

describe('GraphsOverallComponent', () => {
  let component: GraphsOverallComponent;
  let fixture: ComponentFixture<GraphsOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
