import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SolarSystem } from '../../../../model/objects/solar-system';
import { Project } from '../../../../model/project';
import { DataService } from '../../../data/services/data.service';
import { SelectionService } from '../../services/selection.service';
import { Planet } from '../../../../model/objects/planet';
import { Star } from '../../../../model/objects/star-system/star';
import { Moon } from '../../../../model/objects/moon';
import { OrbitObject, Orbit } from '../../../../model/objects/orbit';

@Component({
	selector: 'app-object-editor',
	templateUrl: './object-editor.component.html',
	styleUrls: ['./object-editor.component.css', '../editor.css']
})
export class ObjectEditorComponent implements OnInit {
	currentProject: Project;
	currentSystems: SolarSystem[];

	constructor(private dataService: DataService, private selectionService: SelectionService) {
		this.update(this.dataService.project);
		this.current = null;
		dataService.subscribe(project => this.update(project));
		selectionService.subscribe(object => this.current = object);
	}

	ngOnInit(): void {
	}

	private update(project: Project) {
		this.currentProject = project;
		if (project == null) {
			this.currentSystems = null;
		} else {
			this.currentSystems = Array.from(project.getSystems().values());
		}
	}

	get systems() {
		return this.currentSystems;
	}

	updateSystem(system: SolarSystem) {
		this.dataService.updateSolarSystem(system);
	}

	addSystem() {
		let system = SolarSystem.createSolarSystem('Unnamed System');
		this.dataService.addSolarSystem(system);
	}

	deleteSystem(system: SolarSystem) {
		this.dataService.deleteSolarSystem(system);
	}

	updateObject(object: Star|Planet|Moon) {
		this.current = object;
		let system = this.dataService.getSolarSystem(object);
		let newSystem = system.withUpdatedObject(object);
		this.updateSystem(newSystem);
	}

	updateOrbit(orbit: Orbit) {
		let system = this.dataService.getSolarSystem(this.current);
		let newSystem: SolarSystem;
		if (system.hasObject(orbit)) {
			newSystem = system.withUpdatedObject(orbit);
		} else {
			newSystem = system.withAddedObject(orbit);
		}
		this.updateSystem(newSystem);
	}

	current: Planet | Star | Moon;

	get hasSelection(): boolean {
		return this.current !== null;
	}

	get currentIsPlanet(): boolean {
		return this.current instanceof Planet;
	}

	get currentIsStar(): boolean {
		return this.current instanceof Star;
	}

	get currentIsMoon(): boolean {
		return this.current instanceof Moon;
	}

	get currentCanHaveOrbit(): boolean {
		return this.currentIsPlanet || this.currentIsMoon;
	}
}
