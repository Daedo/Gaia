import { Injectable, EventEmitter } from '@angular/core';
import { AbstractSystemObject } from '../../../model/objects/abstract-system-object';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	constructor() {
		this.emitter = new EventEmitter();
		this.selection = null;
	}

	private emitter: EventEmitter<AbstractSystemObject>;

	private selection: AbstractSystemObject;

	public getCurrentSelection(): AbstractSystemObject {
		return this.selection;
	}

	private sendUpdate() {
		this.emitter.emit(this.selection);
	}

	public hasSelection(): boolean {
		return this.selection != null;
	}

	public deselect() {
		this.selection = null;
		this.sendUpdate();
	}

	deselectIfSelected(object: AbstractSystemObject) {
		if (this.selection == object) {
			this.deselect();
		}
	}

	public select(selection: AbstractSystemObject) {
		this.selection = selection;
		this.sendUpdate();
	}

	public subscribe(callback: (AbstractSystemObject) => void): Subscription {
		return this.emitter.subscribe(callback);
	}
}
