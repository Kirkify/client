import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramViewerComponent } from './program-viewer.component';

describe('ProgramViewerComponent', () => {
  let component: ProgramViewerComponent;
  let fixture: ComponentFixture<ProgramViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
