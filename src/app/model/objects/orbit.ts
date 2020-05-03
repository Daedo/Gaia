import { AbstractSystemObject } from './abstract-system-object';
import { List, Map } from 'immutable';
import { UnitValue } from '../unit/unit';
import { Dimensions } from '../unit/dimension-collection';

export class Orbit extends AbstractSystemObject {
	constructor(uuid: string, private readonly centerObjectUUID: string,
		private readonly orbitProperties: OrbitProperties, private readonly obritObjects: Map<string, OrbitObject>) {
		super(uuid);
	}

	public static deserialize(data: any): Orbit {
		let uuid = data['uuid'];
		let centerObjectUUID = data['centerObjectUUID'];
		let orbitProperties = data['orbitProperties'];
		let obritObjects = data['obritObjects'];
		return new Orbit(uuid, centerObjectUUID, orbitProperties, obritObjects);
	}

	public getCenterObjectUUID(): string {
		return this.centerObjectUUID;
	}

	public withCenterObjectUUID(centerUUID: string): Orbit {
		return new Orbit(this.uuid, centerUUID, this.orbitProperties, this.obritObjects);
	}

	public getOrbitProperties(): OrbitProperties {
		return this.orbitProperties;
	}

	public withOrbitProperties(val: OrbitProperties): Orbit {
		return new Orbit(this.uuid, this.centerObjectUUID, val, this.obritObjects);
	}

	public getOrbitObjects(): Map<string, OrbitObject> {
		return this.obritObjects;
	}

	public withAddedObject(object: OrbitObject): Orbit {
		if (this.obritObjects.has(object.getObjectUUID())) {
			throw new Error('Object is already present');
		}
		let newMap = this.obritObjects.set(object.getObjectUUID(), object);
		return new Orbit(this.uuid, this.centerObjectUUID, this.orbitProperties, newMap);
	}

	public withDeletedObject(object: OrbitObject): Orbit {
		if (!this.obritObjects.has(object.getObjectUUID())) {
			throw new Error('No object to delete');
		}
		let newMap = this.obritObjects.remove(object.getObjectUUID());
		return new Orbit(this.uuid, this.centerObjectUUID, this.orbitProperties, newMap);
	}

	public withUpdatedObject(object: OrbitObject): Orbit {
		if (!this.obritObjects.has(object.getObjectUUID())) {
			throw new Error('No object to update');
		}
		let newMap = this.obritObjects.set(object.getObjectUUID(), object);
		return new Orbit(this.uuid, this.centerObjectUUID, this.orbitProperties, newMap);
	}

	/*public getOrbitalPeriod(): UnitValue {
		let val = 0;
		return UnitValue.create(val, Dimensions.TIME.earthYear);
	}
	TODO
	public getOrbitalVelocity(): UnitValue {
		let val = 0;
		return UnitValue.create(val, Dimensions.VELOCITY.earthVelocity);
	}*/
}

export class OrbitProperties {
	// All numbers are in degree, eccentricity is in [0,1[
	constructor(private readonly semiMajorAxis: number, private readonly eccentricity: number,
		private readonly inclination: number, private readonly longditudeOfTheAscendingNode: number,
		private readonly argumentOfPeriapsis: number) {
	}

	public getSemiMajorAxis(): UnitValue {
		return UnitValue.create(this.semiMajorAxis, Dimensions.LENGTH.au);
	}

	public withSemiMajorAxis(val: UnitValue): OrbitProperties {
		return this.withRawSemiMajorAxis(val.changeUnit(Dimensions.LENGTH.au).asFloat());
	}

	private withRawSemiMajorAxis(val: number): OrbitProperties {
		return new OrbitProperties(val, this.eccentricity, this.inclination, this.longditudeOfTheAscendingNode, this.argumentOfPeriapsis);
	}

	public getSemiMinorAxis(): UnitValue {
		let semiMinorAxis = this.semiMajorAxis * Math.sqrt(1 - (this.eccentricity * this.eccentricity));
		return UnitValue.create(semiMinorAxis, Dimensions.LENGTH.au);
	}

	public getEccentricity(): number {
		return this.eccentricity;
	}

	public withEccentricity(val: number): OrbitProperties {
		if (val < 0 || val >= 1) {
			throw new Error('Eccentricity has to be at least 0 and less than 1');
		}
		return new OrbitProperties(this.semiMajorAxis, val, this.inclination, this.longditudeOfTheAscendingNode, this.argumentOfPeriapsis);
	}

	public getInclination(): UnitValue {
		return UnitValue.create(this.inclination, Dimensions.ANGLE.degrees);
	}

	public withInclination(val: UnitValue): OrbitProperties {
		return this.withRawInclination(val.changeUnit(Dimensions.ANGLE.degrees).asFloat());
	}

	private withRawInclination(val: number): OrbitProperties {
		return new OrbitProperties(this.semiMajorAxis, this.eccentricity, val, this.longditudeOfTheAscendingNode, this.argumentOfPeriapsis);
	}

	public getLongditudeOfTheAscendingNode(): UnitValue {
		// if incination = 0 -> return 0

		return UnitValue.create(this.longditudeOfTheAscendingNode, Dimensions.ANGLE.degrees);
	}

	public withLongditudeOfTheAscendingNode(val: UnitValue): OrbitProperties {
		return this.withRawLongditudeOfTheAscendingNode(val.changeUnit(Dimensions.ANGLE.degrees).asFloat());
	}

	private withRawLongditudeOfTheAscendingNode(val: number): OrbitProperties {
		return new OrbitProperties(this.semiMajorAxis, this.eccentricity, this.inclination, val, this.argumentOfPeriapsis);
	}

	public getArgumentOfPeriapsis(): UnitValue {
		// if inclination = 0 -> undefined
		return UnitValue.create(this.argumentOfPeriapsis, Dimensions.ANGLE.degrees);
	}

	public withArgumentOfPeriapsis(val: UnitValue): OrbitProperties {
		return this.withRawArgumentOfPeriapsis(val.changeUnit(Dimensions.ANGLE.degrees).asFloat());
	}

	private withRawArgumentOfPeriapsis(val: number): OrbitProperties {
		return new OrbitProperties(this.semiMajorAxis, this.eccentricity, this.inclination, this.longditudeOfTheAscendingNode, val);
	}

	public getPeriapsis(): UnitValue {
		let val = this.semiMajorAxis * (1 - this.eccentricity);
		return UnitValue.create(val, Dimensions.LENGTH.au);
	}

	public getApoapsis(): UnitValue {
		let val = this.semiMajorAxis * (1 + this.eccentricity);
		return UnitValue.create(val, Dimensions.LENGTH.au);
	}
}

export class OrbitObject {
	constructor(private readonly objectUUID: string, private readonly trueAnomaly: number) {
	}

	public getObjectUUID(): string {
		return this.objectUUID;
	}
}
