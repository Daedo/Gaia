import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetBuilderMainComponent } from './planet-builder-main.component';

describe('PlanetBuilderMainComponent', () => {
  let component: PlanetBuilderMainComponent;
  let fixture: ComponentFixture<PlanetBuilderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetBuilderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetBuilderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
