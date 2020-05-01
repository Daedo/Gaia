import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SolarSystem } from '../../../../model/objects/solar-system';
import { SelectionService } from '../../services/selection.service';
import { Star } from '../../../../model/objects/star-system/star';
import { Planet } from '../../../../model/objects/planet';
import { AbstractSystemObject } from '../../../../model/objects/abstract-system-object';

@Component({
	selector: 'sidenav-system',
	templateUrl: './sidenav-system.component.html',
	styleUrls: ['./sidenav-system.component.css', '../editor.css']
})
export class SidenavSystemComponent implements OnInit {
	@Input()
	set solarSystem(system: SolarSystem) {
		this.system = system;
		this.sysPlanets = Array.from(this.system.getPlanets().values());
		this.sysStars = Array.from(this.system.getStars().values());
	}

	@Output()
	solarSystemChanged: EventEmitter<SolarSystem>;

	constructor(private selectionService: SelectionService) {
		this.solarSystemChanged = new EventEmitter<SolarSystem>();
	}

	system: SolarSystem;
	private sysStars: Star[];
	private sysPlanets: Planet[];

	ngOnInit(): void { }

	get stars() {
		return this.sysStars;
	}

	get planets() {
		return this.sysPlanets;
	}

	private addObject(object: AbstractSystemObject) {
		let newSystem = this.system.withAddedObject(object);
		this.solarSystemChanged.emit(newSystem);
		this.selectionService.select(object);
	}

	deleteObject(object: AbstractSystemObject) {
		let newSystem = this.system.withDeletedObject(object);
		this.solarSystemChanged.emit(newSystem);
		this.selectionService.deselectIfSelected(object);
	}

	selectObject(object: AbstractSystemObject) {
		this.selectionService.select(object);
	}

	// Stars
	addNewStar() {
		let star = Star.createStar('Unnamed Star');
		this.addObject(star);
	}

	duplicateStar(star: Star) {
		let name = star.getName();
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let starCopy = star.withName(name);
		this.addObject(starCopy);
	}
	// Planets
	addNewPlanet() {
		let planet = Planet.createPlanet('Unnamed Planet');
		this.addObject(planet);
	}

	duplicatePlanet(planet: Planet) {
		let name = planet.getName();
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let planetCopy = planet.withName(name);
		this.addObject(planetCopy);
	}

	log() {
		console.log('log');
	}

	isOpen(): boolean {
		return true;
	}
}
