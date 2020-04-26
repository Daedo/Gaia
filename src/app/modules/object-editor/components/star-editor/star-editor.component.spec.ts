import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarEditorComponent } from './star-editor.component';

describe('StarEditorComponent', () => {
  let component: StarEditorComponent;
  let fixture: ComponentFixture<StarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
