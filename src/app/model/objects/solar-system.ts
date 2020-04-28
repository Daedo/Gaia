import { AbstractDataObject } from './abstract-data-object';
import { List, Map } from 'immutable';
import { Planet } from './planet';
import { Star } from './star-system/star';
import { Moon } from './moon';
import { Orbit } from './orbit';
import { AbstractSystemObject } from './abstract-system-object';
import { ObjectUnsubscribedError } from 'rxjs';
import { AbstractStarSystem } from './star-system/abstract-star-system';
import { UUID } from '../uuid-generator';

export class SolarSystem extends AbstractDataObject {
	private constructor(uuid: string, private readonly name: string, private readonly objects: Map<ObjectType, List<AbstractSystemObject>> ) {
		super(uuid);
	}

	public static createSolarSystem(name: string) {
		const empty = List<AbstractSystemObject>();
		let map = Map<ObjectType, List<AbstractSystemObject>>();
		map = map.set(ObjectType.MOON, empty);
		map = map.set(ObjectType.PLANET, empty);
		map = map.set(ObjectType.ORBIT, empty);
		map = map.set(ObjectType.STAR, empty);
		map = map.set(ObjectType.STAR_SYSTEM, empty);

		let uuid = UUID.getNext();
		return new SolarSystem(uuid, name, map);
	}

	public getName(): string {
		return this.name;
	}

	public withName(name: string): SolarSystem {
		return new SolarSystem(this.uuid, name, this.objects);
	}

	public getMoons(): List<Moon> {
		return this.objects.get(ObjectType.MOON)  as List<Moon>;
	}

	public getPlanets(): List<Planet> {
		return this.objects.get(ObjectType.PLANET) as List<Planet>;
	}

	public getOrbits(): List<Orbit> {
		return this.objects.get(ObjectType.ORBIT) as List<Orbit>;
	}

	public getStars(): List<Star> {
		return this.objects.get(ObjectType.STAR)  as List<Star>;
	}

	public getStarSystems(): List<AbstractStarSystem> {
		return this.objects.get(ObjectType.STAR_SYSTEM) as List<AbstractStarSystem>;
	}

	public addObject(object: AbstractSystemObject): SolarSystem {
		let type = this.getObjectType(object);
		let newList = this.objects.get(type).push(object);
		let newMap = this.objects.set(type, newList);
		return new SolarSystem(this.uuid, this.name, newMap);
	}

	public deleteObject(object: AbstractSystemObject): SolarSystem {
		let type = this.getObjectType(object);
		let lst = this.objects.get(type);
		let index = lst.indexOf(object);

		if (index != -1) {
			let newList = lst.remove(index);
			let newMap = this.objects.set(type, newList);
			return new SolarSystem(this.uuid, this.name, newMap);
		}
		return this;
	}

	public updateObject <P extends AbstractSystemObject>(oldVlaue: P, newValue: P) {
		let type = this.getObjectType(oldVlaue);
		let newType = this.getObjectType(newValue);
		if (type !== newType) {
			throw new Error('Old and new type have to be equal');
		}

		let lst = this.objects.get(type);
		let index = lst.indexOf(oldVlaue);

		if (index != -1) {
			let newList = lst.set(index, newValue);
			let newMap = this.objects.set(type, newList);
			return new SolarSystem(this.uuid, this.name, newMap);
		}
		return this;
	}

	private getObjectType(object: AbstractSystemObject): ObjectType {
		if (object instanceof Planet) {
			return ObjectType.PLANET;
		}

		if (object instanceof Star) {
			return ObjectType.STAR;
		} else if (object instanceof AbstractStarSystem) {
			return ObjectType.STAR_SYSTEM;
		}

		if (object instanceof Moon) {
			return ObjectType.MOON;
		}

		if (object instanceof Orbit) {
			return ObjectType.ORBIT;
		}
	}
}

export enum ObjectType {
	MOON, PLANET, ORBIT, STAR, STAR_SYSTEM
}
