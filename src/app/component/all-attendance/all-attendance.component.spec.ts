import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendanceComponent } from './all-attendance.component';

describe('AllAttendanceComponent', () => {
  let component: AllAttendanceComponent;
  let fixture: ComponentFixture<AllAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
