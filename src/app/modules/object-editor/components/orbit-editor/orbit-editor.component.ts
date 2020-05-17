import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Planet } from '../../../../model/objects/planet';
import { Moon } from '../../../../model/objects/moon';
import { Orbit, OrbitObject, OrbitProperties } from '../../../../model/objects/orbit';
import { DataService } from '../../../data/services/data.service';
import { Star } from '../../../../model/objects/star-system/star';
import { compileNgModule } from '@angular/compiler';
import { UnitValue } from '../../../../model/unit/unit';

@Component({
	selector: 'app-orbit-editor',
	templateUrl: './orbit-editor.component.html',
	styleUrls: ['./orbit-editor.component.css', '../editor.css']
})
export class OrbitEditorComponent implements OnInit {
	readonly eccentricityLowerBound = 0;
	readonly eccentricityUpperBound = 1 - 1e-10;

	currentObject: Planet | Moon;
	currentOrbit: Orbit;
	currentOrbitObject: OrbitObject;

	constructor(private dataService: DataService) {
		this.orbitChanged = new EventEmitter();

		this.currentObject = null;
		this.currentOrbit = null;
		this.currentOrbitObject = null;
	}

	ngOnInit(): void { }

	@Input()
	set orbitObject(object: Planet | Moon) {
		if (object !== undefined && object != null && (object instanceof Moon || object instanceof Planet)) {
			this.update(object);
		}
	}

	private update(object: Planet | Moon) {
		this.currentObject = object;

		this.currentOrbit = null;

		let system = this.dataService.getSolarSystem(this.currentObject);
		// look for an orbit the object is a part of
		for (const orbit of system.getOrbits().values()) {
			for (const object of orbit.getOrbitObjects().values()) {
				if (object.getObjectUUID() === this.currentObject.uuid) {
					this.currentOrbit = orbit;
					this.currentOrbitObject = object;
					break;
				}
			}
		}

		this.centerObjectCandidates = [];
		this.orbitCandidates = [];
		// update candidates
		if (this.currentObject instanceof Planet) {
			// stars for planets
			this.centerObjectCandidates = Array.from(system.getStars().values());
		} else {
			// planets for moons
			this.centerObjectCandidates = Array.from(system.getPlanets().values());
		}

		if (this.currentObject === null) {
			// TODO Search for Orbits this could fit in.
			// Planet Orbits for planets
			// Moon Orbits for moons
		}
	}


	get hasOrbit(): boolean {
		return this.currentOrbit != null;
	}

	// Orbit Creation Options
	centerObjectCandidates: Star[] | Planet[];
	orbitCandidates: Orbit[];
	centerObject: Star | Planet;
	centerObjectIndex = 0;

	createOrbit() {
		let centerObject = this.centerObjectCandidates[this.centerObjectIndex];
		this.currentOrbit = Orbit.createOrbit(centerObject.uuid, OrbitProperties.createOrbitProperties())
			.withAddedObject(OrbitObject.createOrbitObject(this.currentObject.uuid));
			this.orbitChanged.emit(this.currentOrbit);
	}
	// Orbit Edit Options
	@Output()
	orbitChanged: EventEmitter<Orbit>;

	changeSemiMajorAxis(val: UnitValue) {
		let properties = this.currentOrbit.getOrbitProperties().withSemiMajorAxis(val);
		this.currentOrbit = this.currentOrbit.withOrbitProperties(properties);
		this.orbitChanged.emit(this.currentOrbit);
	}

	changeEccentricity(val: number) {
		let properties = this.currentOrbit.getOrbitProperties().withEccentricity(val);
		this.currentOrbit = this.currentOrbit.withOrbitProperties(properties);
		this.orbitChanged.emit(this.currentOrbit);
	}

	changeInclination(val: UnitValue) {
		let properties = this.currentOrbit.getOrbitProperties().withInclination(val);
		this.currentOrbit = this.currentOrbit.withOrbitProperties(properties);
		this.orbitChanged.emit(this.currentOrbit);
	}

	changeLongditudeOfTheAscendingNode(val: UnitValue) {
		let properties = this.currentOrbit.getOrbitProperties().withLongditudeOfTheAscendingNode(val);
		this.currentOrbit = this.currentOrbit.withOrbitProperties(properties);
		this.orbitChanged.emit(this.currentOrbit);
	}

	changeArgumentOfPeriapsis(val: UnitValue) {
		let properties = this.currentOrbit.getOrbitProperties().withArgumentOfPeriapsis(val);
		this.currentOrbit = this.currentOrbit.withOrbitProperties(properties);
		this.orbitChanged.emit(this.currentOrbit);
	}

	/*changeTrueAnomaly(val: UnitValue) {
	}*/
}
