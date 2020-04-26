import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data/services/data.service';
import { Planet } from '../../../../model/planet';
import { Star } from '../../../../model/star';

@Component({
	selector: 'app-object-editor',
	templateUrl: './object-editor.component.html',
	styleUrls: ['./object-editor.component.css']
})
export class ObjectEditorComponent implements OnInit {

	stars: Star[];
	planets: Planet[];

	constructor(private dataService: DataService) {
		dataService.getStars().subscribe(change => this.stars = change);
		dataService.getPlanets().subscribe(change => this.planets = change);
	}

	ngOnInit(): void {
	}

	// Stars
	addNewStar() {
		let star = new Star('Unnamed Star', 1.0);
		this.dataService.addStar(star);
		this.select(star);
	}

	deleteStar(star: Star) {
		this.dataService.deleteStar(star);
		if (this.current === star) {
			this.unselect();
		}
	}

	duplicateStar(star: Star) {
		let starMass = parseFloat(star.starMass.value.toString());
		let name = star.starName;
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let starCopy = new Star(name, starMass);
		this.dataService.addStar(starCopy);
		this.select(starCopy);
	}

	// Planets
	addNewPlanet() {
		let planet = new Planet('Unnamed Planet', 1.0, 1.0);
		this.dataService.addPlanet(planet);
		this.select(planet);
	}

	deletePlanet(planet: Planet) {
		this.dataService.deletePlanet(planet);
		if (this.current === planet) {
			this.unselect();
		}
	}

	duplicatePlanet(planet: Planet) {
		let planetMass = parseFloat(planet.planetMass.value.toString());
		let planetRadius = parseFloat(planet.planetRadius.value.toString());
		let name = planet.planetName;
		if (!name.startsWith('Copy of ')) {
			name = 'Copy of ' + name;
		}
		let planetCopy = new Planet(name, planetMass, planetRadius);
		this.dataService.addPlanet(planetCopy);
		this.select(planetCopy);
	}

	select(object: Star | Planet) {
		this.current = object;
	}

	unselect() {
		this.current = null;
	}

	log() {
		console.log('Test');
	}

	current: Planet | Star;

	get hasSelection(): boolean {
		return this.current !== null;
	}

	get currentIsPlanet(): boolean {
		return this.current instanceof Planet;
	}

	get currentIsStar(): boolean {
		return this.current instanceof Star;
	}

}
