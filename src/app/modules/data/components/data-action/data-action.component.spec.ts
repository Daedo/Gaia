import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataActionComponent } from './data-action.component';

describe('DataActionComponent', () => {
	let component: DataActionComponent;
	let fixture: ComponentFixture<DataActionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DataActionComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
