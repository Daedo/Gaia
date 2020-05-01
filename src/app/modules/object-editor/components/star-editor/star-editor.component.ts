import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnitValue } from '../../../../model/unit/unit';
import { Dimensions } from '../../../../model/unit/dimension-collection';
import { Star } from '../../../../model/objects/star-system/star';

@Component({
	selector: 'app-star-editor',
	templateUrl: './star-editor.component.html',
	styleUrls: [ '../editor.css', './star-editor.component.css']
})
export class StarEditorComponent implements OnInit {
	currentStar: Star;
	currentMass: UnitValue;

	massLowerBound = UnitValue.create(0.08, Dimensions.MASS.solarMass);

	constructor() {
		this.starChanged = new EventEmitter();
		this.update(Star.createStar('Placeholder'));
	}

	ngOnInit(): void {
	}

	private update(star: Star) {
		this.currentStar = star;
		this.currentMass = star.getMass();
	}

	@Input()
	set star(star: Star) {
		if (star !== undefined && star !== null && star instanceof Star) {
			this.update(star);
		}
	}

	@Output()
	starChanged: EventEmitter<Star>;

	get currentName(): string {
		return this.currentStar.getName();
	}

	set currentName(name: string) {
		this.starChanged.emit(this.currentStar.withName(name));
	}

	changeMass(val: UnitValue) {
		this.starChanged.emit(this.currentStar.withMass(val));
	}

}
