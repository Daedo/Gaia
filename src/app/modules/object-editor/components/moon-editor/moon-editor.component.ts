import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Moon, TriaxialRadius } from '../../../../model/objects/moon';
import { UnitValue } from '../../../../model/unit/unit';
import { Dimensions } from '../../../../model/unit/dimension-collection';

@Component({
	selector: 'app-moon-editor',
	templateUrl: './moon-editor.component.html',
	styleUrls: ['./moon-editor.component.css', '../editor.css']
})
export class MoonEditorComponent implements OnInit {
	radiusLowerBound = UnitValue.create(1, Dimensions.LENGTH.km);

	currentMoon: Moon;
	currentMass: UnitValue;
	currentRadius: TriaxialRadius;

	constructor() {
		this.moonChanged = new EventEmitter();
		this.update(Moon.createMoon('Placeholder'));
	}

	ngOnInit(): void {
	}

	private update(moon: Moon) {
		this.currentMoon = moon;
		this.currentMass = moon.getMass();
		this.currentRadius = moon.getRadius();
	}

	@Input()
	set moon(moon: Moon) {
		if (moon !== undefined && moon != null && moon instanceof Moon) {
			this.update(moon);
		}
	}

	@Output()
	moonChanged: EventEmitter<Moon>;

	get currentName(): string {
		return this.currentMoon.getName();
	}

	set currentName(name: string) {
		this.moonChanged.emit(this.currentMoon.withName(name));
	}

	changeMass(val: UnitValue) {
		this.moonChanged.emit(this.currentMoon.withMass(val));
	}

	changeRadiusA(val: UnitValue) {
		let newRad = this.currentRadius.withRadiusA(val);
		this.moonChanged.emit(this.currentMoon.withRadius(newRad));
	}

	changeRadiusB(val: UnitValue) {
		let newRad = this.currentRadius.withRadiusB(val);
		this.moonChanged.emit(this.currentMoon.withRadius(newRad));
	}

	changeRadiusC(val: UnitValue) {
		let newRad = this.currentRadius.withRadiusC(val);
		this.moonChanged.emit(this.currentMoon.withRadius(newRad));
	}

	get isMinorMoon(): boolean {
		return this.currentMoon.isMinorMoon();
	}

	get radiusName(): string {
		if (this.isMinorMoon) {
			return 'Radius A';
		}
		return 'Radius';
	}

	getComposition(): string {
		return '';
	}
}
