import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Planet } from '../../../../model/objects/planet';
import { Moon } from '../../../../model/objects/moon';
import { Orbit } from '../../../../model/objects/orbit';
import { DataService } from '../../../data/services/data.service';
import { Star } from '../../../../model/objects/star-system/star';

@Component({
	selector: 'app-orbit-editor',
	templateUrl: './orbit-editor.component.html',
	styleUrls: ['./orbit-editor.component.css']
})
export class OrbitEditorComponent implements OnInit {

	currentOrbit: Orbit;
	currentCenterObject: Planet | Moon;

	constructor(private dataService: DataService) {
		this.orbitChanged = new EventEmitter();
		this.currentOrbit = null;
		this.currentCenterObject = null;
	}

	ngOnInit(): void {
	}

	@Input()
	set orbitObject(object: Planet | Moon) {
		if (object !== undefined && object != null && (object instanceof Moon || object instanceof Planet)) {
			this.update(object);
		}
	}

	private update(object: Planet| Moon) {
		this.currentCenterObject = object;
	}

	get hasOrbit(): boolean {
		return this.currentOrbit != null;
	}


	// Orbit Creation Options
	getCenterObjectCandidates(): Star[] | Planet[] {
		let system = this.dataService.getSolarSystem(this.currentCenterObject);
		if (this.currentCenterObject instanceof Planet) {
			// stars for planets
			return Array.from(system.getStars().values());
		}
		// planets for moons
		return Array.from(system.getPlanets().values());
	}

	getOrbitCandidates() {
		// planet Orbits for planets
		// moon orbits for moons
	}

	// Orbit Edit Options
	@Output()
	orbitChanged: EventEmitter<Orbit>;





}
