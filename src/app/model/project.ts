import { SolarSystem } from './objects/solar-system';
import { List } from 'immutable';

export class Project {
	constructor(private name: string, private systems: List<SolarSystem>) {}

	public getName(): string {
		return this.name;
	}

	public withName(name: string): Project {
		return new Project(name, this.systems);
	}

	public getSystems(): List<SolarSystem> {
		return this.systems;
	}

	public withAddedSystem(system: SolarSystem): Project {
		return new Project(this.name, this.systems.push(system));
	}

	public withDeletedSystem(system: SolarSystem): Project {
		let index = this.systems.indexOf(system);
		if (index != -1) {
			let newSys = this.systems.delete(index);
			return new Project(this.name, newSys);
		}
		return this;
	}

	public withUpdatedSystem(oldSystem: SolarSystem, newSystem: SolarSystem): Project {
		let index = this.systems.indexOf(oldSystem);
		if (index != -1) {
			let newSys = this.systems.set(index, newSystem);
			return new Project(this.name, newSys);
		}
		return this;
	}

	public static getEmptyProject(name: string): Project {
		return new Project(name, List.of());
	}
}
