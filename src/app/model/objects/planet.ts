import { AbstractSystemObject } from './abstract-system-object';
import { UnitValue } from '../unit/unit';
import { Dimensions } from '../unit/dimension-collection';
import { INTERPOLATOR } from '../data/interpolator';
import { UUID } from '../uuid-generator';

export class Planet extends AbstractSystemObject {
	/**
	 * All numbers are in earth units.
	 */
	private constructor(uuid: string, private readonly name: string, private readonly mass: number, private readonly radius: number) {
		super(uuid);
	}

	public static createPlanet(name: string, mass = 1.0, radius = 1.0) {
		return new Planet(UUID.getNext(), name, mass, radius);
	}

	public getName(): string {
		return this.name;
	}

	public withName(newName: string): Planet {
		return new Planet(this.uuid, newName, this.mass, this.radius);
	}

	public getMass(): UnitValue {
		return UnitValue.create(this.mass, Dimensions.MASS.earthMass);
	}

	withMass(val: UnitValue): Planet {
		let earthVal = val.changeUnit(Dimensions.MASS.earthMass).value.valueOf();
		return this.withRawMass(parseFloat(earthVal));
	}

	public getRawMass(): number {
		return this.mass;
	}

	public withRawMass(mass: number): Planet {
		return new Planet(this.uuid, this.name, mass, this.radius);
	}

	public getRadius(): UnitValue {
		return UnitValue.create(this.radius, Dimensions.LENGTH.earthRadius);
	}

	withRadius(val: UnitValue) {
		let earthVal = val.changeUnit(Dimensions.LENGTH.earthRadius).value.valueOf();
		return this.withRawRadius(parseFloat(earthVal));
	}

	public getRawRadius() {
		return this.radius;
	}

	public withRawRadius(radius: number): Planet {
		return new Planet(this.uuid, this.name, this.mass, radius);
	}

	public getGravity(): UnitValue {
		const val = this.mass / this.radius / this.radius;
		return UnitValue.create(val, Dimensions.GRAVITY.earthGravity);
	}

	public getDensity(): UnitValue {
		const val = this.mass / this.radius / this.radius / this.radius;
		return UnitValue.create(val, Dimensions.DENSITY.earthDensity);
	}

	public getCircumference(): UnitValue {
		return UnitValue.create(this.radius, Dimensions.LENGTH.earthCircumference);
	}

	public getSurfaceArea(): UnitValue {
		const val = this.radius * this.radius;
		return UnitValue.create(val, Dimensions.AREA.earthSurfaceArea);
	}

	public getVolume(): UnitValue {
		const val = this.radius * this.radius * this.radius;
		return UnitValue.create(val, Dimensions.VOLUME.earthVolume);
	}

	public getEscapeVelocity(): UnitValue {
		const val = Math.sqrt(this.mass / this.radius);
		return UnitValue.create(val, Dimensions.VELOCITY.earthVelocity);
	}

	public getHillShpereInner(): UnitValue {
		let d = this.mass / this.radius / this.radius / this.radius;
		let val = 2.44 * this.radius * Math.cbrt(d / 2.602292);
		return UnitValue.create(val, Dimensions.LENGTH.earthRadius).changeUnit(Dimensions.LENGTH.lunarDistance);
	}

	// public get planetHillSphereOuter(): UnitValue {}

	public getMarkup(): any {
		let out = INTERPOLATOR.getComposition(this.mass, this.radius);
		return out;
	}

	public getHabitability(): string {
		let out = '';
		if (this.mass < 0.1) {
			out += this.name + ' is to light to be habitable.\n';
		}

		if (this.mass > 3.5) {
			out += this.name + ' is to heavy to be habitable.\n';
		}

		if (this.radius < 0.5) {
			out += this.name + ' is to small to be habitable.\n';
		}

		if (this.radius > 1.5) {
			out += this.name + ' is to large to be habitable.\n';
		}
		if (out === '') {
			out = this.name + ' is in theory habitable.';
		}

		return out.trim();
	}
}
