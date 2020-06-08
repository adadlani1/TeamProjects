import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedErrorComponent } from './unauthorised-error.component';

describe('UnauthorisedErrorComponent', () => {
  let component: UnauthorisedErrorComponent;
  let fixture: ComponentFixture<UnauthorisedErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorisedErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorisedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
