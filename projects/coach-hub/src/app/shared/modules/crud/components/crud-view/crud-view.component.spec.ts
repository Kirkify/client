import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudViewComponent } from './crud-view.component';

describe('CrudViewComponent', () => {
  let component: CrudViewComponent;
  let fixture: ComponentFixture<CrudViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
