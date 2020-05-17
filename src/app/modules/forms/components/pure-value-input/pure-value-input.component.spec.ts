import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureValueInputComponent } from './pure-value-input.component';

describe('PureValueInputComponent', () => {
  let component: PureValueInputComponent;
  let fixture: ComponentFixture<PureValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureValueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
