import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-data-action',
	templateUrl: './data-action.component.html',
	styleUrls: ['./data-action.component.css']
})
export class DataActionComponent implements OnInit {

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
	}

	public get canUndo() {
		return this.dataService.canUndo;
	}

	public get canRedo() {
		return this.dataService.canRedo;
	}

	public undo() {
		this.dataService.undo();
	}

	public redo() {
		this.dataService.redo();
	}
}
