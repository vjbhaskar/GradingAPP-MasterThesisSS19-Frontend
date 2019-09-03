import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedExamsDialogComponent } from './assigned-exams-dialog.component';

describe('AssignedExamsDialogComponent', () => {
  let component: AssignedExamsDialogComponent;
  let fixture: ComponentFixture<AssignedExamsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedExamsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedExamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
