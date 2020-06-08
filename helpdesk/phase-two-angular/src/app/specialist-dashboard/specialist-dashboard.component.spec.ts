import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistDashboardComponent } from './specialist-dashboard.component';

describe('SpecialistDashboardComponent', () => {
  let component: SpecialistDashboardComponent;
  let fixture: ComponentFixture<SpecialistDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
