import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDisplayerComponent } from './price-displayer.component';

describe('PriceDisplayerComponent', () => {
  let component: PriceDisplayerComponent;
  let fixture: ComponentFixture<PriceDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
