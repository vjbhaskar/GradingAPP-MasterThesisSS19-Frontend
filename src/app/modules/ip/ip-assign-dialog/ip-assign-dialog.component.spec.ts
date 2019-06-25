import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAssignDialogComponent } from './ip-assign-dialog.component';

describe('IpAssignDialogComponent', () => {
  let component: IpAssignDialogComponent;
  let fixture: ComponentFixture<IpAssignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpAssignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
