import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileManagerComponent } from './student-profile-manager.component';

describe('StudentProfileManagerComponent', () => {
  let component: StudentProfileManagerComponent;
  let fixture: ComponentFixture<StudentProfileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
