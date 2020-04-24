import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecificProgramTimesDialogComponent } from './add-specific-program-times-dialog.component';

describe('AddSpecificProgramTimesDialogComponent', () => {
  let component: AddSpecificProgramTimesDialogComponent;
  let fixture: ComponentFixture<AddSpecificProgramTimesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecificProgramTimesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecificProgramTimesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
