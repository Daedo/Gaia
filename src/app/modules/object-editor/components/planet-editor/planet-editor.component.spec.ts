import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetEditorComponent } from './planet-editor.component';

describe('PlanetEditorComponent', () => {
  let component: PlanetEditorComponent;
  let fixture: ComponentFixture<PlanetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
