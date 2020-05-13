import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDisplayerComponent } from './group-displayer.component';

describe('GroupDisplayerComponent', () => {
  let component: GroupDisplayerComponent;
  let fixture: ComponentFixture<GroupDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
