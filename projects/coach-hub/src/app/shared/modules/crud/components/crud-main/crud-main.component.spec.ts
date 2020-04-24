import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMainComponent } from './crud-main.component';

describe('CrudMainComponent', () => {
  let component: CrudMainComponent;
  let fixture: ComponentFixture<CrudMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
