import { AbstractDataObject } from './abstract-data-object';
import { Map } from 'immutable';
import { Planet } from './planet';
import { Star } from './star-system/star';
import { Moon } from './moon';
import { Orbit } from './orbit';
import { AbstractSystemObject } from './abstract-system-object';
import { AbstractStarSystem } from './star-system/abstract-star-system';
import { UUID } from '../uuid-generator';


type IDMap = Map<string, AbstractSystemObject>;

export class SolarSystem extends AbstractDataObject {
	private constructor(uuid: string, private readonly name: string, private readonly objects: Map<ObjectType, IDMap> ) {
		super(uuid);
	}

	public static createSolarSystem(name: string) {
		const empty = Map<string, AbstractSystemObject>();
		let map = Map<ObjectType, IDMap>();
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

	public getMoons(): Map<string, Moon> {
		return this.objects.get(ObjectType.MOON)  as Map<string, Moon>;
	}

	public getPlanets(): Map<string, Planet> {
		return this.objects.get(ObjectType.PLANET) as Map<string, Planet>;
	}

	public getOrbits(): Map<string, Orbit> {
		return this.objects.get(ObjectType.ORBIT) as Map<string, Orbit>;
	}

	public getStars(): Map<string, Star> {
		return this.objects.get(ObjectType.STAR)  as Map<string, Star>;
	}

	public getStarSystems(): Map<string, AbstractStarSystem> {
		return this.objects.get(ObjectType.STAR_SYSTEM) as Map<string, AbstractStarSystem>;
	}

	public withAddedObject(object: AbstractSystemObject): SolarSystem {
		let type = this.getObjectType(object);
		let oldMap = this.objects.get(type);
		if (oldMap.has(object.uuid)) {
			throw new Error('Object is already present');
		}
		let newMap = oldMap.set(object.uuid, object);
		let newObjects = this.objects.set(type, newMap);
		return new SolarSystem(this.uuid, this.name, newObjects);
	}

	public withDeletedObject(object: AbstractSystemObject): SolarSystem {
		let type = this.getObjectType(object);
		let oldMap = this.objects.get(type);
		if (!oldMap.has(object.uuid)) {
			throw new Error('No object to delete');
		}
		let newMap = oldMap.remove(object.uuid);
		let newObjects = this.objects.set(type, newMap);
		return new SolarSystem(this.uuid, this.name, newObjects);
	}

	public withUpdatedObject(object: AbstractSystemObject): SolarSystem {
		let type = this.getObjectType(object);
		let oldMap = this.objects.get(type);
		if (!oldMap.has(object.uuid)) {
			throw new Error('No object to update');
		}
		let newMap = oldMap.set(object.uuid, object);
		let newObjects = this.objects.set(type, newMap);
		return new SolarSystem(this.uuid, this.name, newObjects);
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

	public hasObject(object: AbstractSystemObject): boolean {
		if (object === null || object === undefined) {
			return false;
		}
		let type = this.getObjectType(object);
		if (type === null || type === undefined) {
			return false;
		}
		return this.objects.get(type).has(object.uuid);
	}
}

export enum ObjectType {
	MOON, PLANET, ORBIT, STAR, STAR_SYSTEM
}
