import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSystemComponent } from './sidenav-system.component';

describe('SidenavSystemComponent', () => {
	let component: SidenavSystemComponent;
	let fixture: ComponentFixture<SidenavSystemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidenavSystemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidenavSystemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
