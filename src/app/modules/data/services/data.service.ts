import { Injectable } from '@angular/core';
import { Star } from '../../../model/star';
import { Planet } from '../../../model/planet';

import { Observable, of } from 'rxjs';
import { SolarSystem } from '../../../model/solar-system';
import { ActionBuffer } from '../../../model/action-buffer';
import { List } from 'immutable';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	/**
	 * Service that holds the data of the current project
	 */
	constructor() {
		let stars = [new Star('Sol', 1.0)];
		let planets = [new Planet('Terra', 1.0, 1.0)];
		this.systems = List.of(SolarSystem.createEmptySystem('Testsystem', stars, planets));
		this.history.push(this.systems);

		this.stars = [new Star('Sol', 1.0)];
		this.planets = [new Planet('Terra', 1.0, 1.0)];
	}

	private history: ActionBuffer<List<SolarSystem>>;
	private systems: List<SolarSystem>;

	private stars: Star[];

	public getSystems(): Observable<List<SolarSystem>> {
		return of(this.systems);
	}

	public getStars(): Observable<Star[]> {
		return of(this.stars);
	}

	public addStar(star: Star) {
		if (star === null || star === undefined) {
			throw new Error('Star can not be null or undefined');
		}
		this.stars.push(star);
	}

	public deleteStar(star: Star) {
		let index = this.stars.indexOf(star);
		if (index !== -1) {
			this.stars.splice(index, 1);
		}
	}

	private planets: Planet[];

	public getPlanets(): Observable<Planet[]> {
		return of(this.planets);
	}

	public addPlanet(planet: Planet) {
		if (planet === null || planet === undefined) {
			throw new Error('Planet can not be null or undefined');
		}
		this.planets.push(planet);
	}

	public deletePlanet(planet: Planet) {
		let index = this.planets.indexOf(planet);
		if (index !== -1) {
			this.planets.splice(index, 1);
		}
	}
}
