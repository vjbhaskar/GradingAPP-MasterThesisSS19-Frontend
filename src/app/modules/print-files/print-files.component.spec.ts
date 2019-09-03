import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFilesComponent } from './print-files.component';

describe('PrintFilesComponent', () => {
  let component: PrintFilesComponent;
  let fixture: ComponentFixture<PrintFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
