import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRawDataComponent } from './download-raw-data.component';

describe('DownloadRawDataComponent', () => {
  let component: DownloadRawDataComponent;
  let fixture: ComponentFixture<DownloadRawDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadRawDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
