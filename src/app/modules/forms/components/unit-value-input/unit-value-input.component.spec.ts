import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitValueInputComponent } from './unit-value-input.component';

describe('UnitValueInputComponent', () => {
  let component: UnitValueInputComponent;
  let fixture: ComponentFixture<UnitValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitValueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
