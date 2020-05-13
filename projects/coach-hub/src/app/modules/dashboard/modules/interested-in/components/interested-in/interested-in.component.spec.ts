import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedInComponent } from './interested-in.component';

describe('InterestedInComponent', () => {
  let component: InterestedInComponent;
  let fixture: ComponentFixture<InterestedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
