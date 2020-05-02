import { AbstractSystemObject } from './abstract-system-object';
import { UUID } from '../uuid-generator';
import { UnitValue, LinearUnit } from '../unit/unit';
import { Dimensions } from '../unit/dimension-collection';

export class Moon extends AbstractSystemObject {
	/**
	 * All numbers are in lunar units.
	 */
	constructor(uuid: string, private readonly name: string,
		private readonly mass: number, private readonly radius: TriaxialRadius) {
		super(uuid);
	}

	public static createMoon(name: string, mass = 1, radius: number | TriaxialRadius = 1) {
		let tRad = null;
		if (radius instanceof TriaxialRadius) {
			tRad = radius;
		} else {
			tRad = new TriaxialRadius(radius);
		}
		return new Moon(UUID.getNext(), name, mass, tRad);
	}

	public getName(): string {
		return this.name;
	}

	public withName(newName: string): Moon {
		return new Moon(this.uuid, newName, 1, new TriaxialRadius(1));
	}

	public getMass(): UnitValue {
		return UnitValue.create(this.mass, Dimensions.MASS.lunarMass);
	}

	public withMass(val: UnitValue): Moon {
		let lunarVal = val.changeUnit(Dimensions.MASS.lunarMass).asFloat();
		return this.withRawMass(lunarVal);
	}

	private withRawMass(val: number): Moon {
		return new Moon(this.uuid, this.name, val, this.radius);
	}

	public getRawMass(): number {
		return this.mass;
	}

	public withRadius(radius: TriaxialRadius): Moon {
		return new Moon(this.uuid, this.name, this.mass, radius);
	}

	public getRadius(): TriaxialRadius {
		return this.radius;
	}

	private get averageRadius(): number {
		let ra = this.radius.getRawRadiusA();
		let rb = this.radius.getRawRadiusB();
		let rc = this.radius.getRawRadiusC();
		return (ra + rb + rc) / 3;
	}

	public getForm(): string {
		let ra = this.radius.getRawRadiusA();
		let rb = this.radius.getRawRadiusB();
		let rc = this.radius.getRawRadiusC();
		let r = [ra, rb, rc].sort();

		if (!this.isMinorMoon || (r[0] == r[1] && r[1] == r[2])) {
			// All axis have the same lenght
			return 'Sphere';
		}

		if (r[0] < r[1] && r[1] < r[2]) {
			// All axis are of different length
			return 'Triaxial Spheroid';
		}

		if (r[0] == r[1] && r[1] < r[2]) {
			// There are two short an one long axis
			return 'Prolate Shereoid';
		}
		// There are one short and two long axis
		return 'Oblate Spheroid';
	}

	public getDensity(): UnitValue {
		let vol = this.getVolume().asFloat();
		let val = this.mass / vol;
		return UnitValue.create(val, Dimensions.DENSITY.lunarDensity);
	}

	public getGravity(): UnitValue {
		// Approximation as a uniform sphere
		let r = this.averageRadius;
		let val = this.mass / r / r;
		return UnitValue.create(val, Dimensions.GRAVITY.lunarGravity);
	}

	public getEscapeVelocity(): UnitValue {
		const val = Math.sqrt(this.mass / this.averageRadius);
		return UnitValue.create(val, Dimensions.VELOCITY.lunarEscapeVelocity);
	}

	public getMarkup(): string {
		return 'TODO';
	}

	/**
	 * Returns true if the radius of the moon is < 235 km.
	 * Bigger Objects are usually shperes due to their own gravity.
	 */
	public isMinorMoon(): boolean {
		// Returns true if radius <= 235km
		let rad = this.radius.getRadiusA().changeUnit(Dimensions.LENGTH.km).asFloat();
		return rad < 235;
	}

	public getVolume(): UnitValue {
		let rA = this.radius.getRawRadiusA();
		let rB = this.radius.getRawRadiusB();
		let rC = this.radius.getRawRadiusC();
		let vol = rA * rB * rC;
		return UnitValue.create(vol, Dimensions.VOLUME.lunarVolume);
	}

	public getSurfaceArea(): UnitValue {
		// Knud Thomsen Approximation
		// (((a*b)^1.6 + (a*c)^1.6 + (b*c)^1.6 )/3)^0.625
		let rA = this.radius.getRawRadiusA();
		let rB = this.radius.getRawRadiusB();
		let rC = this.radius.getRawRadiusC();

		let f1 = Math.pow(rA * rB, 1.6);
		let f2 = Math.pow(rA * rC, 1.6);
		let f3 = Math.pow(rB * rC, 1.6);
		let f4 = (f1 + f2 + f3) / 3;
		let sa = Math.pow(f4, 0.625);
		return UnitValue.create(sa, Dimensions.AREA.lunarSurfaceArea);
	}
}

export class TriaxialRadius {
	constructor(private readonly radiusA: number, private readonly radiusB = radiusA, private readonly radiusC = radiusA) { }

	public getRadiusA(): UnitValue {
		return UnitValue.create(this.radiusA, Dimensions.LENGTH.lunarRadius);
	}

	public withRadiusA(val: UnitValue): TriaxialRadius {
		return this.withRawRadiusA(val.changeUnit(Dimensions.LENGTH.lunarRadius).asFloat());
	}

	private withRawRadiusA(val: number): TriaxialRadius {
		return new TriaxialRadius(val, this.radiusB, this.radiusC);
	}

	public getRawRadiusA(): number {
		return this.radiusA;
	}

	public getRadiusB(): UnitValue {
		return UnitValue.create(this.radiusB, Dimensions.LENGTH.lunarRadius);
	}

	public withRadiusB(val: UnitValue): TriaxialRadius {
		return this.withRawRadiusB(val.changeUnit(Dimensions.LENGTH.lunarRadius).asFloat());
	}

	private withRawRadiusB(val: number): TriaxialRadius {
		return new TriaxialRadius(this.radiusA, val, this.radiusC);
	}

	public getRawRadiusB(): number {
		return this.radiusB;
	}

	public getRadiusC(): UnitValue {
		return UnitValue.create(this.radiusC, Dimensions.LENGTH.lunarRadius);
	}

	public withRadiusC(val: UnitValue): TriaxialRadius {
		return this.withRawRadiusC(val.changeUnit(Dimensions.LENGTH.lunarRadius).asFloat());
	}

	private withRawRadiusC(val: number): TriaxialRadius {
		return new TriaxialRadius(this.radiusA, this.radiusB, val);
	}

	public getRawRadiusC(): number {
		return this.radiusC;
	}
}
