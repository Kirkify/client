import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachApplicationFormComponent } from './coach-application-form.component';

describe('CoachApplicationFormComponent', () => {
  let component: CoachApplicationFormComponent;
  let fixture: ComponentFixture<CoachApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
