import { Project } from '../project';

export const SAVEFILE_VERSION = '1';

export function deserialize(json: string): Project {
	// Parse JSON
	let object = JSON.parse(json);
	// Migrate if neccessary
	if (!object.hasOwnProperty('version')) {
		// Use Legacy Migrator
		throw new Error('Unsupported File Version');
	}

	while (object['version'] != SAVEFILE_VERSION) {
		// Migrate to the next higher version
		throw new Error('Unsupported File Version');
	}

	return Project.deserialize(object);
}

export function serialize(projectObject: Project): string {
	// Stringify, Add Fileversion
	projectObject['version'] = SAVEFILE_VERSION;
	return JSON.stringify(projectObject, null, 4);
}


