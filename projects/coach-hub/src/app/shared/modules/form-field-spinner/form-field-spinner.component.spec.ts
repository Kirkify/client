import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldSpinnerComponent } from './form-field-spinner.component';

describe('FormFieldSpinnerComponent', () => {
  let component: FormFieldSpinnerComponent;
  let fixture: ComponentFixture<FormFieldSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
