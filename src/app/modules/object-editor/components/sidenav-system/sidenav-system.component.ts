import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SolarSystem } from '../../../../model/objects/solar-system';
import { SelectionService } from '../../services/selection.service';
import { Star } from '../../../../model/objects/star-system/star';
import { Planet } from '../../../../model/objects/planet';
import { AbstractSystemObject } from '../../../../model/objects/abstract-system-object';
import { Moon } from '../../../../model/objects/moon';

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
		this.sysMoons = Array.from(this.system.getMoons().values());
	}

	@Output()
	solarSystemChanged: EventEmitter<SolarSystem>;

	constructor(private selectionService: SelectionService) {
		this.solarSystemChanged = new EventEmitter<SolarSystem>();
	}

	system: SolarSystem;
	private sysStars: Star[];
	private sysPlanets: Planet[];
	private sysMoons: Moon[];

	ngOnInit(): void { }

	get stars() {
		return this.sysStars;
	}

	get planets() {
		return this.sysPlanets;
	}

	get moons() {
		return this.sysMoons;
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

	dublicateStar(star: Star) {
		let name = star.getName();
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let mass = star.getRawMass();
		let starCopy = Star.createStar(name, mass);
		this.addObject(starCopy);
	}

	// Planets
	addNewPlanet() {
		let planet = Planet.createPlanet('Unnamed Planet');
		this.addObject(planet);
	}

	dublicatePlanet(planet: Planet) {
		let name = planet.getName();
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let mass = planet.getRawMass();
		let rad = planet.getRawRadius();
		let planetCopy = Planet.createPlanet(name, mass, rad);
		this.addObject(planetCopy);
	}
	// Moons
	addNewMoon() {
		let moon = Moon.createMoon('Unnamed Moon');
		this.addObject(moon);
	}

	dublicateMoon(moon: Moon) {
		let name = moon.getName();
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let mass = moon.getRawMass();
		let rad = moon.getRadius();
		let moonCopy = Moon.createMoon(name, mass, rad);
		this.addObject(moonCopy);
	}

	log() {
		console.log('log');
	}

	isOpen(): boolean {
		return true;
	}
}
