import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorMessageComponent } from './login-error-message.component';

describe('LoginErrorMessageComponent', () => {
  let component: LoginErrorMessageComponent;
  let fixture: ComponentFixture<LoginErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
