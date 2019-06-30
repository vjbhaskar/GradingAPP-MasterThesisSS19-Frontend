import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedExamsComponent } from './assigned-exams.component';

describe('AssignedExamsComponent', () => {
  let component: AssignedExamsComponent;
  let fixture: ComponentFixture<AssignedExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
