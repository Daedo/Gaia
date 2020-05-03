import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitEditorComponent } from './orbit-editor.component';

describe('OrbitEditorComponent', () => {
	let component: OrbitEditorComponent;
	let fixture: ComponentFixture<OrbitEditorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrbitEditorComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrbitEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
