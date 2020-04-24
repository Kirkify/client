import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAutoCompleteComponent } from './tag-auto-complete.component';

describe('TagAutoCompleteComponent', () => {
  let component: TagAutoCompleteComponent;
  let fixture: ComponentFixture<TagAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
