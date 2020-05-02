import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonEditorComponent } from './moon-editor.component';

describe('MoonEditorComponent', () => {
	let component: MoonEditorComponent;
	let fixture: ComponentFixture<MoonEditorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MoonEditorComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MoonEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
