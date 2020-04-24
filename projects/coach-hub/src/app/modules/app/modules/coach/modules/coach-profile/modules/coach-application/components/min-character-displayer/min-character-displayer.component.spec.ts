import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinCharacterDisplayerComponent } from './min-character-displayer.component';

describe('MinCharacterDisplayerComponent', () => {
  let component: MinCharacterDisplayerComponent;
  let fixture: ComponentFixture<MinCharacterDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinCharacterDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinCharacterDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
