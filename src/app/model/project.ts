import { SolarSystem } from './objects/solar-system';
import { Map } from 'immutable';

export class Project {
	constructor(private name: string, private systems: Map<string, SolarSystem>) {}

	public getName(): string {
		return this.name;
	}

	public withName(name: string): Project {
		return new Project(name, this.systems);
	}

	public getSystems(): Map<string, SolarSystem> {
		return this.systems;
	}

	public withAddedSystem(system: SolarSystem): Project {
		if (this.systems.has(system.uuid)) {
			throw new Error('Solar System is already present');
		}
		let newMap = this.systems.set(system.uuid, system);
		return new Project(this.name, newMap);
	}

	public withDeletedSystem(system: SolarSystem): Project {
		if (!this.systems.has(system.uuid)) {
			throw new Error('No Solar System to delete');
		}
		let newMap = this.systems.remove(system.uuid);
		return new Project(this.name, newMap);
	}

	public withUpdatedSystem(system: SolarSystem): Project {
		if (!this.systems.has(system.uuid)) {
			throw new Error('No Solar System to update');
		}
		let newMap = this.systems.set(system.uuid, system);
		return new Project(this.name, newMap);
	}

	public static getEmptyProject(name: string): Project {
		return new Project(name, Map());
	}
}
