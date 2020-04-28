import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationShellComponent } from './navigation-shell.component';

describe('NavigationShellComponent', () => {
  let component: NavigationShellComponent;
  let fixture: ComponentFixture<NavigationShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
