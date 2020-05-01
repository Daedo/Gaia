import { AbstractStarSystem } from './abstract-star-system';
import { UnitValue } from '../../unit/unit';
import { Dimensions } from '../../unit/dimension-collection';
import { UUID } from '../../uuid-generator';

export class Star extends AbstractStarSystem {
	private constructor(uuid: string, private readonly name: string, private readonly mass: number) {
		super(uuid);
	}

	public static createStar(name: string, mass = 1.0) {
		return new Star(UUID.getNext(), name, mass);
	}

	/**
     * The Mass of the star in solar masses.
     */
	public getMass(): UnitValue {
		return UnitValue.create(this.mass, Dimensions.MASS.solarMass);
	}

	public withMass(val: UnitValue) {
		let solarMass = val.changeUnit(Dimensions.MASS.solarMass);
		return this.withRawMass(parseFloat(solarMass.value.valueOf()));
	}

	public withRawMass(mass: number): Star {
		return new Star(this.uuid, this.name, mass);
	}

	public getRawMass(): number {
		return this.mass;
	}

	public getName(): string {
		return this.name;
	}

	public withName(newName: string): Star {
		return new Star(this.uuid, newName, this.mass);
	}

	/**
     * The luminosity of the star relative to the sun.
     */
	public getLuminosity(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 3), Dimensions.LUMINOSITY.solarLuminosity);
	}

	/**
     * The radius of the star in solar radii.
     */
	public getRadius(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 0.74), Dimensions.LENGTH.solarRadius);
	}

	/**
     * The temperature of the star relative to the sun.
     */
	public getTemperature(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 0.505), Dimensions.TEMPERATURE.solarTemperature);
	}

	/**
     * The lifetime of the star relative to the sun.
     */
	public getLifetime(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, -2.5), Dimensions.TIME.lifetimeSun);
	}

	/**
     * The inner bound of the star's habitable zone in AU.
     */
	public getHabitableInner(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 1.5) * 0.95, Dimensions.LENGTH.au);
	}

	/**
     * The outer bound of the star's habitable zone in AU.
     */
	public getHabitableOuter(): UnitValue {
		return UnitValue.create(Math.pow(this.mass, 1.5) * 1.37, Dimensions.LENGTH.au);
	}

	public getStarClass(): string {
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

	public getColor(): string {
		return null;
	}

	public getHabitablility(): string {
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
	public getFrostline(): UnitValue {
		return UnitValue.create(4.85 * Math.sqrt(Math.pow(this.mass, 3)), Dimensions.LENGTH.au);
	}

	/**
     * The inner bound of the star's influence in AU.
     */
	public getInnerLimit(): UnitValue {
		return UnitValue.create(0.1 * this.mass, Dimensions.LENGTH.au);
	}

	/**
     * The outer bound of the star's influence in AU.
     */
	public getOuterLimit(): UnitValue {
		return UnitValue.create(40 * this.mass, Dimensions.LENGTH.au);
	}
}
