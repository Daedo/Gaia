import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SolarSystem } from '../../../model/objects/solar-system';
import { ActionBuffer } from '../../../model/action-buffer';
import { Project } from '../../../model/project';
import { AbstractSystemObject } from '../../../model/objects/abstract-system-object';
import { createStandardProject } from '../../../model/data/default-project';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private static readonly HISTORY_SIZE = 100;

	/**
	 * Service that holds the data of the current project
	 */
	constructor() {
		this.history = new ActionBuffer(DataService.HISTORY_SIZE);
		let project = createStandardProject();
		this.history.push(project);
	}

	private history: ActionBuffer<Project>;
	public get canUndo(): boolean {
		return this.history.canUndo();
	}

	public get canRedo(): boolean {
		return this.history.canRedo();
	}

	public undo() {
		this.history.undo();
	}

	public redo() {
		this.history.redo();
	}

	public subscribe(callback: (Project) => void ): Subscription {
		return this.history.subscribe(callback);
	}

	public get project(): Project {
		return this.history.getCurrent();
	}

	public get solarSystems(): IterableIterator<SolarSystem> {
		return this.project.getSystems().values();
	}

	public addSolarSystem(system: SolarSystem) {
		let newProj = this.project.withAddedSystem(system);
		this.history.push(newProj);
	}

	public updateSolarSystem(system: SolarSystem) {
		let newProj = this.project.withUpdatedSystem(system);
		this.history.push(newProj);
	}

	public deleteSolarSystem(system: SolarSystem) {
		let newProj = this.project.withDeletedSystem(system);
		this.history.push(newProj);
	}

	public getSolarSystem(object: AbstractSystemObject): SolarSystem {
		for (let system of this.solarSystems) {
			if (system.hasObject(object)) {
				return system;
			}
		}
		return null;
	}
}
