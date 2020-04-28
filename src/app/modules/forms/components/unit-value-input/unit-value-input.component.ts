import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnitValue, AbstractUnit } from '../../../../model/unit/unit';
import Big from 'big.js';

@Component({
	selector: 'unit-value-input',
	templateUrl: './unit-value-input.component.html',
	styleUrls: ['./unit-value-input.component.css']
})
export class UnitValueInputComponent implements OnInit {
	constructor() { }
	ngOnInit(): void { }

	uValue: UnitValue;
	@Input()
	set unitValue(value: UnitValue) {
		this.uValue = value;
		this.textValue = this.uValue.value.toPrecision(4);
	}
	@Output() unitValueChange = new EventEmitter<UnitValue>();

	get unit(): AbstractUnit {
		return this.uValue.unit;
	}

	set unit(unit: AbstractUnit) {
		this.uValue = this.uValue.changeUnit(unit);
		this.unitValueChange.emit(this.uValue);
		this.textValue = this.uValue.value.toPrecision(4);
		this.invalid = null;
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
				this.uValue = new UnitValue(this.unit, newVal);
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
