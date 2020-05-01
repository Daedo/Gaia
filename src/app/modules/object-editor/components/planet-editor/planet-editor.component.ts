import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnitValue } from '../../../../model/unit/unit';
import { Dimensions } from '../../../../model/unit/dimension-collection';
import { Planet } from '../../../../model/objects/planet';

@Component({
	selector: 'app-planet-editor',
	templateUrl: './planet-editor.component.html',
	styleUrls: [ '../editor.css', './planet-editor.component.css']
})
export class PlanetEditorComponent implements OnInit {
	massLowerBound = UnitValue.create(0.1, Dimensions.MASS.earthMass);
	massUpperBound = UnitValue.create(4000, Dimensions.MASS.earthMass);

	radiusLowerBound = UnitValue.create(0.5, Dimensions.LENGTH.earthRadius);
	radiusUpperBound = UnitValue.create(20, Dimensions.LENGTH.earthRadius);

	currentPlanet: Planet;
	currentMass: UnitValue;
	currentRadius: UnitValue;

	constructor() {
		this.planetChanged = new EventEmitter();
		this.update(Planet.createPlanet('Placeholder'));
	}

	ngOnInit(): void {
	}

	private update(planet: Planet) {
		this.currentPlanet = planet;
		this.currentMass = planet.getMass();
		this.currentRadius = planet.getRadius();
	}

	@Input()
	set planet(planet: Planet) {
		if (planet !== undefined && planet !== null && planet instanceof Planet) {
			this.update(planet);
		}
	}

	@Output()
	planetChanged: EventEmitter<Planet>;

	get currentName(): string {
		return this.currentPlanet.getName();
	}

	set currentName(name: string) {
		this.planetChanged.emit(this.currentPlanet.withName(name));
	}


	changeMass(val: UnitValue) {
		this.planetChanged.emit(this.currentPlanet.withMass(val));
	}

	changeRadius(val: UnitValue) {
		this.planetChanged.emit(this.currentPlanet.withRadius(val));
	}

	getComposition(): string {
		const markup = this.currentPlanet.getMarkup();
		let out = '';

		for (const material in markup) {
			let percent = markup[material] * 100;
			percent = Math.round((percent + Number.EPSILON) * 100) / 100;
			out += material + ': ' + percent + '%\n';
		}
		return out.trim();
	}
}
