import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AbstractUnit } from '../../../../model/unit/unit';


@Component({
	selector: 'unit-picker',
	templateUrl: './unit-picker.component.html',
	styleUrls: ['./unit-picker.component.css']
})
export class UnitPickerComponent implements OnInit {

	@ViewChild('selectModel') private selectModel: ElementRef;

	selected: AbstractUnit;

	@Input()
	set selectedUnit(unit: AbstractUnit) {
		this.selected = unit;
		this.units = unit.dimension.units;
	}
	@Output() selectedUnitChange = new EventEmitter<AbstractUnit>();

	units: AbstractUnit[];

	constructor() {
	}

	ngOnInit(): void {
	}

	selectionChanged(event): void {
		this.selectedUnitChange.emit(this.units[event.target.selectedIndex - 1]);
		this.selectModel.nativeElement.selectedIndex = 0;
	}
}
