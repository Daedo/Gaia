import { UnitValue } from './unit';
import { Dimensions } from './dimension-collection';

export class Star {
	constructor(private name: string, private mass: number) { }

	/**
     * The Mass of the star in solar masses.
     */
	public get starMass(): UnitValue {
		return UnitValue.create(this.mass, Dimensions.MASS.solarMass);
	}

	public set starSolarMass(v: number) {
		this.mass = v;
	}

	public get starName(): string {
		return this.name;
	}

	public set starName(newName: string) {
		this.name = newName;
	}

	/**
     * The luminosity of the star relative to the sun.
     */
	public get starLuminosity(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 3), Dimensions.LUMINOSITY.solarLuminosity);
	}

	/**
     * The radius of the star in solar radii.
     */
	public get starRadius(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 0.74), Dimensions.LENGTH.solarRadius);
	}

	/**
     * The temperature of the star relative to the sun.
     */
	public get starTemperature(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 0.505), Dimensions.TEMPERATURE.solarTemperature);
	}

	/**
     * The lifetime of the star relative to the sun.
     */
	public get starLifetime(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, -2.5), Dimensions.TIME.lifetimeSun);
	}

	/**
     * The inner bound of the star's habitable zone in AU.
     */
	public get starHabitableInner(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 1.5) * 0.95, Dimensions.LENGTH.au);
	}

	/**
     * The outer bound of the star's habitable zone in AU.
     */
	public get starHabitableOuter(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 1.5) * 1.37, Dimensions.LENGTH.au);
	}

	public get starClass(): string {
		if (this.mass >= 16) {
			return 'O';
		}
		if (this.mass >= 2.1) {
			return 'B';
		}
		if (this.mass >= 1.4) {
			return 'A';
		}
		if (this.mass >= 1.04) {
			return 'F';
		}
		if (this.mass >= 0.8) {
			return 'G';
		}
		if (this.mass >= 0.45) {
			return 'K';
		}
		if (this.mass >= 0.08) {
			return 'M';
		}
		return 'Not a star.';
	}

	public get starColor(): string {
		return null;
	}

	public get starHabitablility(): string {
		if (this.mass == 1) {
			return "It's the sun... You've built the sun...";
		}
		if (this.mass > 1.4) {
			return 'The lifetime of the star might be too short for evolution.\nStar gives off high amounts of UV radiation.';
		}
		if (this.mass < 0.6) {
			return 'The habitable zone is too close to the star.\nSolar activity will be a problem.';
		}
		return 'Ideal for conditions for life in the habitable zone.';
	}

	// Orbit Functions

	/**
     * The frostline of the star in AU.
     */
	public get starFrostline(): UnitValue {
		return UnitValue.create(4.85 * Math.sqrt(Math.pow(this.mass, 3)), Dimensions.LENGTH.au);
	}

	/**
     * The inner bound of the star's influence in AU.
     */
	public get starInnerLimit(): UnitValue {
		return UnitValue.create(0.1 * this.mass, Dimensions.LENGTH.au);
	}

	/**
     * The outer bound of the star's influence in AU.
     */
	public get starOuterLimit(): UnitValue {
		return UnitValue.create(40 * this.mass, Dimensions.LENGTH.au);
	}
}
