import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDialogComponent } from './lab-dialog.component';

describe('LabDialogComponent', () => {
  let component: LabDialogComponent;
  let fixture: ComponentFixture<LabDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
