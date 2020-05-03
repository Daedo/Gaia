import { UUID } from "../../uuid-generator";

export abstract class Migrator {
	public abstract migrate(projectObject: any): any;
	public abstract get outputVersion(): string;
}


/**
 * Migrates Savefiles from Gaia-Legacy (v0.1) to v1 Savefiles.
 */
export class LegacyMigrator extends Migrator {
	public migrate(projectObject: any): any {
		let out = {};
		out['name'] = 'Migrated Project';
		out['systems'] = this.migrateSystem(projectObject);
		return out;
	}

	private migrateSystem(object: any): any {
		// throw new Error('Method not implemented.');
		let uuid = UUID.getNext();
		// Create a system Object
		let system = {};
		system['uuid'] = uuid;
		system['name'] = 'Unnamed System';
		let sysObjects = {'star-systems': {}};

		let stars = {};
		let starIndex = [];
		for (const star of object['stars']) {
			let cUUID = UUID.getNext();
			starIndex.push(cUUID);
			star['uuid'] = cUUID;
			stars[cUUID] = star;
		}
		sysObjects['stars'] = stars;

		let planets = {};
		let planetIndex = [];
		for (const planet of object['planets']) {
			let cUUID = UUID.getNext();
			planetIndex.push(cUUID);
			planet['uuid'] = cUUID;
			delete planet['planetTypeIndex'];
			planets[cUUID] = planet;
		}
		sysObjects['planets'] = planets;

		// TODO Add Orbits and Moons
		let orbits = {};
		for (const orbit of  object['orbits']) {
			// TODO
		}
		sysObjects['orbits'] = orbits;


		let moons = {};
		for (const moon of object['moons']) {
			// TODO
		}
		sysObjects['moons'] = moons;

		throw new Error('Not yet implemented');

		system['objects'] = sysObjects;
		return {uuid: system};
	}

	public get outputVersion(): string {
		return '1';
	}
}

export const MIGRATORS: {[version: string]: Migrator} = {
	'0': new LegacyMigrator()
};
