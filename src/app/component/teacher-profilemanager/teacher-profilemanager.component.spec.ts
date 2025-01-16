import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfilemanagerComponent } from './teacher-profilemanager.component';

describe('TeacherProfilemanagerComponent', () => {
  let component: TeacherProfilemanagerComponent;
  let fixture: ComponentFixture<TeacherProfilemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherProfilemanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherProfilemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
