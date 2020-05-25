import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachBaseProfileSimpleDisplayComponent } from './coach-base-profile-simple-display.component';

describe('CoachBaseProfileSimpleDisplayComponent', () => {
  let component: CoachBaseProfileSimpleDisplayComponent;
  let fixture: ComponentFixture<CoachBaseProfileSimpleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachBaseProfileSimpleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachBaseProfileSimpleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
