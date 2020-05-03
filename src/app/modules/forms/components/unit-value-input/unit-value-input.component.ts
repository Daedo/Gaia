import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UnitValue, AbstractUnit } from '../../../../model/unit/unit';
import Big from 'big.js';
import { update } from 'immutable';

@Component({
	selector: 'unit-value-input',
	templateUrl: './unit-value-input.component.html',
	styleUrls: ['./unit-value-input.component.css']
})
export class UnitValueInputComponent implements OnInit {
	constructor() {
		this.currentValue = null;
	}

	ngOnInit(): void { }

	currentValue: UnitValue;

	@Input()
	set unitValue(value: UnitValue) {
		// Reset the value only if new != current (by value not just by unit)
		if (this.currentValue === null) {
			// We initialize the picker
			this.update(value);
		} else {
			// Check if the value is different
			let changed = value.changeUnit(this.currentValue.unit);
			let diff = changed.value.minus(this.currentValue.value).abs();
			let prec = 1e-6;

			if (diff.gte(new Big(prec))) {
				// The value has changed
				this.update(changed);
			}
		}
	}
	@Output() unitValueChange = new EventEmitter<UnitValue>();


	update(value: UnitValue) {
		this.currentValue = value;
		this.textValue = this.currentValue.value.toPrecision(4);
	}

	get unit(): AbstractUnit {
		return this.currentValue.unit;
	}

	set unit(unit: AbstractUnit) {
		this.currentValue = this.currentValue.changeUnit(unit);
		this.textValue = this.currentValue.value.toPrecision(4);
		this.invalid = this.validate(this.currentValue.value);
		this.unitValueChange.emit(this.currentValue);
	}

	textValue: string;
	get value(): string {
		return this.textValue;
	}

	set value(value: string) {
		try {
			let newVal = new Big(value);
			this.invalid = this.validate(newVal);
			if (this.invalid === null) {
				this.currentValue = new UnitValue(this.unit, newVal);
				this.unitValueChange.emit(new UnitValue(this.unit, newVal));
			}
		} catch (error) {
			this.invalid = 'Input is not a number';
		}
	}

	@Input()
	editable = false;
	@Input()
	lowerBound: UnitValue;
	@Input()
	upperBound: UnitValue;

	validate(value: Big): string {
		let rawValue = this.unit.toUnitless(value);
		if (this.lowerBound !== undefined) {
			let lower = this.lowerBound.unit.toUnitless(this.lowerBound.value);
			if (rawValue.cmp(lower).toFixed(0) === '-1') {
				return 'Input has to be at least ' + this.lowerBound.changeUnit(this.unit).asString();
			}
		}

		if (this.upperBound !== undefined) {
			let upper = this.upperBound.unit.toUnitless(this.upperBound.value);
			if (rawValue.cmp(upper).toFixed(0) === '1') {
				return 'Input has to be at most ' + this.upperBound.changeUnit(this.unit).asString();
			}
		}
		return null;
	}

	warnMessage: string = null;
	@Output() warningChange = new EventEmitter<string>();
	set invalid(value: string) {
		if (this.warnMessage != value) {
			this.warningChange.emit(value);
		}
		this.warnMessage = value;
	}

	get invalid(): string {
		return this.warnMessage;
	}
}
