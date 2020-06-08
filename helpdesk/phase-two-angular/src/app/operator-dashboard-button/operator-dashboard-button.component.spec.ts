import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorDashboardButtonComponent } from './operator-dashboard-button.component';

describe('OperatorDashboardButtonComponent', () => {
  let component: OperatorDashboardButtonComponent;
  let fixture: ComponentFixture<OperatorDashboardButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorDashboardButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorDashboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
