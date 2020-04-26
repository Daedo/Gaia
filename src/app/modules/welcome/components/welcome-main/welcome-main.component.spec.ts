import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMainComponent } from './welcome-main.component';

describe('WelcomeMainComponent', () => {
  let component: WelcomeMainComponent;
  let fixture: ComponentFixture<WelcomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
