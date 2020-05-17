import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'pure-value-input',
	templateUrl: './pure-value-input.component.html',
	styleUrls: ['./pure-value-input.component.css']
})
export class PureValueInputComponent implements OnInit {
	constructor() {
		this.currentValue = null;
	}

	ngOnInit(): void { }

	currentValue: number;

	@Input()
	set pureValue(value: number) {
		// Reset the value only if new != current (by value not just by unit)
		if (this.currentValue === null) {
			// We initialize the picker
			this.update(value);
		} else {
			// Check if the value is different
			let diff = this.currentValue - value;
			let prec = 1e-6;

			if (diff >= prec) {
				// The value has changed
				this.update(value);
			}
		}
	}
	@Output() pureValueChange = new EventEmitter<number>();


	update(value: number) {
		this.currentValue = value;
		this.textValue = this.currentValue.toPrecision(4);
	}

	textValue: string;
	get value(): string {
		return this.textValue;
	}

	set value(value: string) {
		try {
			let newVal = parseFloat(value);
			this.invalid = this.validate(newVal);
			if (this.invalid === null) {
				this.currentValue = newVal;
				this.pureValueChange.emit(newVal);
			}
		} catch (error) {
			this.invalid = 'Input is not a number';
		}
	}

	@Input()
	editable = false;
	@Input()
	lowerBound: number;
	@Input()
	upperBound: number;

	validate(value: number): string {
		let rawValue = value;
		if (this.lowerBound !== undefined) {
			if (this.lowerBound > rawValue) {
				return 'Input has to be at least ' + this.lowerBound;
			}
		}

		if (this.upperBound !== undefined) {
			if (this.upperBound < rawValue) {
				return 'Input has to be at most ' + this.upperBound;
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
