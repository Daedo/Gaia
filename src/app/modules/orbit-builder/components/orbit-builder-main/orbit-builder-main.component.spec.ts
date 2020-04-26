import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitBuilderMainComponent } from './orbit-builder-main.component';

describe('OrbitBuilderMainComponent', () => {
  let component: OrbitBuilderMainComponent;
  let fixture: ComponentFixture<OrbitBuilderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitBuilderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitBuilderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
