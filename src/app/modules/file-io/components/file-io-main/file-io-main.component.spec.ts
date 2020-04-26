import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIoMainComponent } from './file-io-main.component';

describe('FileIoMainComponent', () => {
  let component: FileIoMainComponent;
  let fixture: ComponentFixture<FileIoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileIoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
