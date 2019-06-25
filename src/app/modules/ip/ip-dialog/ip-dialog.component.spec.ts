import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpDialogComponent } from './ip-dialog.component';

describe('IpDialogComponent', () => {
  let component: IpDialogComponent;
  let fixture: ComponentFixture<IpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
