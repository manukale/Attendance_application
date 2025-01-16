import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPasswordresetComponent } from './teacher-passwordreset.component';

describe('TeacherPasswordresetComponent', () => {
  let component: TeacherPasswordresetComponent;
  let fixture: ComponentFixture<TeacherPasswordresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherPasswordresetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherPasswordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
