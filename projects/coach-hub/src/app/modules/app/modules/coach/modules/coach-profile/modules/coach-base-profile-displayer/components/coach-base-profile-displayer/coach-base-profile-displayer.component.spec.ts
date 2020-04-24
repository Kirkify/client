import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachBaseProfileDisplayerComponent } from './coach-base-profile-displayer.component';

describe('CoachBaseProfileDisplayerComponent', () => {
  let component: CoachBaseProfileDisplayerComponent;
  let fixture: ComponentFixture<CoachBaseProfileDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachBaseProfileDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachBaseProfileDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
