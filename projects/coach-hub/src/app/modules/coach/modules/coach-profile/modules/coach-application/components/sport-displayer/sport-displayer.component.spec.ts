import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDisplayerComponent } from './sport-displayer.component';

describe('SportDisplayerComponent', () => {
  let component: SportDisplayerComponent;
  let fixture: ComponentFixture<SportDisplayerComponent>;
  let elementContainer: HTMLElement;
  let firstValue: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportDisplayerComponent);
    component = fixture.componentInstance;
    elementContainer = fixture.nativeElement;
    firstValue = elementContainer.querySelector('.firstValue');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display nothing', () => {
    component.value = [];
    fixture.detectChanges();

    expect(firstValue.textContent).toBe('');
    const additionalSelection = elementContainer.querySelector('.additional-selection');
    expect(additionalSelection).toBeNull();
  });

  it('should fail gracefully', () => {
    component.value = [1, 2, 3];
    fixture.detectChanges();

    expect(firstValue.textContent).toBe('');
    const additionalSelection = elementContainer.querySelector('.additional-selection');
    expect(additionalSelection.textContent).toBe(' (+ 2 others)');
  });

  it('should display "Basketball" only', () => {
    component.value = [1];
    component.allSports = [
      {
        id: 1,
        name: 'Basketball'
      }
    ];
    fixture.detectChanges();

    expect(firstValue.textContent).toBe('Basketball');
    const additionalSelection = elementContainer.querySelector('.additional-selection');
    expect(additionalSelection).toBeNull();
  });

  it('should display "Baseball" and "(+ 1 other)"', () => {
    component.value = [1, 2];
    component.allSports = [
      {
        id: 1,
        name: 'Baseball'
      },
      {
        id: 2,
        name: 'Basketball'
      },
    ];
    fixture.detectChanges();

    expect(firstValue.textContent).toBe('Baseball');
    const additionalSelection = elementContainer.querySelector('.additional-selection');
    expect(additionalSelection.textContent).toBe(' (+ 1 other)');
  });

  it('should display "Baseball" and "(+ 2 others)"', () => {
    component.value = [1, 2, 3];
    component.allSports = [
      {
        id: 1,
        name: 'Baseball'
      },
      {
        id: 2,
        name: 'Basketball'
      },
      {
        id: 3,
        name: 'Soccer'
      }
    ];
    fixture.detectChanges();

    expect(firstValue.textContent).toBe('Baseball');
    const additionalSelection = elementContainer.querySelector('.additional-selection');
    expect(additionalSelection.textContent).toBe(' (+ 2 others)');
  });
});
