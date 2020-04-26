import { UnitValue } from './unit';
import { Dimensions } from './dimension-collection';
import { INTERPOLATOR } from './data/interpolator';

export class Planet {
	/**
	 * All numbers are in earth units.
	 */
	constructor(private name: string, private mass: number, private radius: number) {}

	public get planetName(): string {
		return this.name;
	}

	public set planetName(newName: string) {
		this.name = newName;
	}

	public get planetMass(): UnitValue {
		return UnitValue.create(this.mass, Dimensions.MASS.earthMass);
	}

	public set planetEarthMass(v: number) {
		this.mass = v;
	}

	public get planetRadius(): UnitValue {
		return UnitValue.create(this.radius, Dimensions.LENGTH.earthRadius);
	}

	public set planetEarthRadius(v: number) {
		this.radius = v;
	}

	public get planetGravity(): UnitValue {
		const val = this.mass / this.radius / this.radius;
		return UnitValue.create(val, Dimensions.GRAVITY.earthGravity);
	}

	public get planetDensity(): UnitValue {
		const val = this.mass / this.radius / this.radius / this.radius;
		return UnitValue.create(val, Dimensions.DENSITY.earthDensity);
	}

	public get planetCircumference(): UnitValue {
		return UnitValue.create(this.radius, Dimensions.LENGTH.earthCircumference);
	}

	public get planetSurfaceArea(): UnitValue {
		const val = this.radius * this.radius;
		return UnitValue.create(val, Dimensions.AREA.earthSurfaceArea);
	}

	public get planetVolume(): UnitValue {
		const val = this.radius * this.radius * this.radius;
		return UnitValue.create(val, Dimensions.VOLUME.earthVolume);
	}

	public get planetEscapeVelocity(): UnitValue {
		const val = Math.sqrt(this.mass / this.radius);
		return UnitValue.create(val, Dimensions.VELOCITY.earthVelocity);
	}

	public get planetHillShpereInner(): UnitValue {
		let d = this.mass / this.radius / this.radius / this.radius;
		let val = 2.44 * this.radius * Math.cbrt(d / 2.602292);
		return UnitValue.create(val, Dimensions.LENGTH.earthRadius).changeUnit(Dimensions.LENGTH.lunarDistance);
	}

	// public get planetHillSphereOuter(): UnitValue {}

	public get planetMarkup(): any {
		let out = INTERPOLATOR.getComposition(this.mass, this.radius);
		return out;
	}

	public get planetHabitability(): string {
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

