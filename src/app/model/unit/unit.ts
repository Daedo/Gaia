import Big from 'big.js';
import { Dimension } from './dimension';

abstract class AbstractUnit {
	constructor(private unitDimension: Dimension, private unitName: string, private unitSymbol: string) { }

	public get name(): string {
		return this.unitName;
	}

	public set name(value: string) {
		this.unitName = value;
	}

	public get symbol(): string {
		return this.unitSymbol;
	}

	public set symbol(value: string) {
		this.unitSymbol = value;
	}

	public get dimension(): Dimension {
		return this.unitDimension;
	}

	public abstract toUnitless(value: Big): Big;
	public abstract toUnit(value: Big): Big;

}

class ScaleUnit extends AbstractUnit {
	constructor(dimension: Dimension, name: string, symbol: string, private scaleFactor: Big) {
		super(dimension, name, symbol);
	}

	public toUnitless(value: Big) {
		return value.times(this.scaleFactor);
	}
	public toUnit(value: Big) {
		return value.div(this.scaleFactor);
	}

	public static create(dimension: Dimension, scale: number, name: string, symbol: string): ScaleUnit {
		return new ScaleUnit(dimension, name, symbol, new Big(scale));
	}
}

class LinearUnit extends AbstractUnit {
	constructor(dimension: Dimension, name: string, symbol: string, private slope: Big, private intercept: Big) {
		super(dimension, name, symbol);
	}

	public toUnitless(value: Big) {
		return value.minus(this.intercept).div(this.slope);
	}
	public toUnit(value: Big) {
		return value.times(this.slope).plus(this.intercept);
	}

	public static create<D extends Dimension>(dimension: Dimension, slope: number, intercept: number,
		name: string, symbol: string): LinearUnit {
		return new LinearUnit(dimension, name, symbol, new Big(slope), new Big(intercept));
	}
}

class UnitValue {
	constructor(private uUnit: AbstractUnit, private uValue: Big) {
	}

	public get value(): Big {
		return this.uValue;
	}

	public get unit(): AbstractUnit {
		return this.uUnit;
	}

	public changeUnit(newUnit: AbstractUnit): UnitValue {
		if (newUnit.dimension !== this.uUnit.dimension) {
			throw new Error('New dimension (' + newUnit.dimension.name + ') has to equal old dimension (' +
				this.uUnit.dimension.name + ')');
		}
		// Convert the value to the new unit
		let newValue = newUnit.toUnit(this.uUnit.toUnitless(this.uValue));
		return new UnitValue(newUnit, newValue);
	}

	public asString(): string {
		return this.value.toPrecision(4) + ' ' + this.uUnit.symbol;
	}

	public asFloat(): number {
		return parseFloat(this.value.valueOf());
	}

	public static create(value: number, unit: AbstractUnit) {
		return new UnitValue(unit, new Big(value));
	}
}

export {
	AbstractUnit, ScaleUnit, LinearUnit, UnitValue
};
