export abstract class Migrator {
	public abstract migrate(projectObject: any): any;
}


/**
 * Migrates Savefiles from Gaia-Legacy (v0.1) to v1 Savefiles.
 */
export class LegacyMigrator extends Migrator {

	public migrate(projectObject: any): any {
		throw new Error("Method not implemented.");
	}
}

export const MIGRATORS = {
	'legacy': new LegacyMigrator()
};
