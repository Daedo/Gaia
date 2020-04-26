import { List }  from 'immutable';
import { Planet } from './planet';
import { Star } from './star';

export class SolarSystem {
	private planets: List<Planet>;
	private stars: List<Star>;
	private name: string;

	constructor(name: string, stars: List<Star>, planets: List<Planet>) {
		this.name = name;
		this.stars = stars;
		this.planets = planets;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): SolarSystem {
		return new SolarSystem(name, this.stars, this.planets);
	}

	public get systemPlanets(): List<Planet> {
		return this.planets;
	}

	public addPlanet(planet: Planet): SolarSystem {
		return new SolarSystem(this.name, this.stars, this.planets.push(planet));
	}

	public removePlanet(planet: Planet): SolarSystem {
		let index = this.planets.indexOf(planet);
		if (index !== -1) {
			return new SolarSystem(this.name, this.stars, this.planets.remove(index));
		}
		return this;
	}

	public get systemStars(): List<Star> {
		return this.stars;
	}

	public addStar(star: Star): SolarSystem {
		return new SolarSystem(this.name, this.stars.push(star), this.planets);
	}

	public removeStar(star: Star): SolarSystem {
		let index = this.stars.indexOf(star);
		if (index !== -1) {
			return new SolarSystem(this.name, this.stars.remove(index), this.planets);
		}
		return this;
	}

	public static createEmptySystem(name: string, stars: Star[], planets: Planet[]) {
		return new SolarSystem(name, List(stars), List(planets));
	}
}
