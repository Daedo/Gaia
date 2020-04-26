import { Component, OnInit, Input } from '@angular/core';
import { UnitValue } from '../../../../model/unit';
import { Planet } from '../../../../model/planet';
import { Dimensions } from '../../../../model/dimension-collection';

@Component({
	selector: 'app-planet-editor',
	templateUrl: './planet-editor.component.html',
	styleUrls: [ '../editor.css', './planet-editor.component.css']
})
export class PlanetEditorComponent implements OnInit {

	@Input()
	set planet(planet: Planet) {
		if (planet !== undefined && planet !== null && planet instanceof Planet) {
			this.currentPlanet = planet;
			this.currentMass = planet.planetMass;
			this.currentRadius = planet.planetRadius;
		}
	}

	currentPlanet: Planet;
	currentMass: UnitValue;
	changeMass(val: UnitValue) {
		let earthVal = val.changeUnit(Dimensions.MASS.earthMass).value.valueOf();
		this.currentPlanet.planetEarthMass = parseFloat(earthVal);
	}

	currentRadius: UnitValue;
	changeRadius(val: UnitValue) {
		let earthVal = val.changeUnit(Dimensions.LENGTH.earthRadius).value.valueOf();
		this.currentPlanet.planetEarthRadius = parseFloat(earthVal);
	}

	massLowerBound = UnitValue.create(0.1, Dimensions.MASS.earthMass);
	massUpperBound = UnitValue.create(4000, Dimensions.MASS.earthMass);

	radiusLowerBound = UnitValue.create(0.5, Dimensions.LENGTH.earthRadius);
	radiusUpperBound = UnitValue.create(20, Dimensions.LENGTH.earthRadius);

	get planetComposition(): string {
		const markup = this.currentPlanet.planetMarkup;
		let out = '';

		for (const material in markup) {
			let percent = markup[material] * 100;
			percent = Math.round((percent + Number.EPSILON) * 100) / 100;
			out += material + ': ' + percent + '%\n';
		}
		return out.trim();
	}

	constructor() {
		this.currentPlanet = new Planet('Placeholder', 1, 1);
		this.currentMass = this.currentPlanet.planetMass;
		this.currentRadius = this.currentPlanet.planetRadius;
	}

	ngOnInit(): void {
	}
}
