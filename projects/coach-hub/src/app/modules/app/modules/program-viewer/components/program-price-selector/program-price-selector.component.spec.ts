import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPriceSelectorComponent } from './program-price-selector.component';

describe('ProgramPriceSelectorComponent', () => {
  let component: ProgramPriceSelectorComponent;
  let fixture: ComponentFixture<ProgramPriceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramPriceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramPriceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
