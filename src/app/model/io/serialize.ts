import { Project } from '../project';
import { MIGRATORS } from './migration/migrator';

export const SAVEFILE_VERSION = '1';

export function deserialize(json: string): Project {
	// Parse JSON
	let object = JSON.parse(json);
	// Migrate if neccessary
	if (!object.hasOwnProperty('version')) {
		// Legacy Savefile
		object['version'] = '0';
	}

	while (object['version'] != SAVEFILE_VERSION) {
		let version = object['version'];
		if (! MIGRATORS.hasOwnProperty(version)) {
			throw new Error('Unsupported File Version');
		}
		// Migrate to the next higher version
		let migrator = MIGRATORS[version];
		object = migrator.migrate(object);
		object['version'] = migrator.outputVersion;
	}

	return Project.deserialize(object);
}

export function serialize(projectObject: Project): string {
	// Stringify, Add Fileversion
	projectObject['version'] = SAVEFILE_VERSION;
	return JSON.stringify(projectObject, null, 4);
}


