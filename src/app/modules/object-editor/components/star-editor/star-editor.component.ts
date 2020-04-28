import { Component, OnInit, Input } from '@angular/core';
import { Star } from '../../../../model/star';
import { UnitValue } from '../../../../model/unit/unit';
import { Dimensions } from '../../../../model/unit/dimension-collection';

@Component({
	selector: 'app-star-editor',
	templateUrl: './star-editor.component.html',
	styleUrls: [ '../editor.css', './star-editor.component.css']
})
export class StarEditorComponent implements OnInit {
	@Input()
	set star(star: Star) {
		if (star !== undefined && star !== null && star instanceof Star) {
			this.currentStar = star;
			this.currentMass = star.starMass;
		}
	}

	currentStar: Star;
	currentMass: UnitValue;
	massLowerBound = UnitValue.create(0.08, Dimensions.MASS.solarMass);

	warn(val) {
		console.log('warn');
		console.log(val);
	}

	changeMass(val: UnitValue) {
		let solVal = val.changeUnit(Dimensions.MASS.solarMass);
		this.currentStar.starSolarMass = parseFloat(solVal.value.valueOf());
	}

	constructor() {
		this.currentStar = new Star('Placeholder', 1);
		this.currentMass = this.currentStar.starMass;
	}

	ngOnInit(): void {
	}

}
