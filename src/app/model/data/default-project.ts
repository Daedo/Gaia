import { Planet } from '../objects/planet';
import { Star } from '../objects/star-system/star';
import { SolarSystem } from '../objects/solar-system';
import { Project } from '../project';

export function createStandardProject(): Project {
	let earth = Planet.createPlanet('Terra');
	let sun = Star.createStar('Sol');
	let system = SolarSystem.createSolarSystem('Solar System');
	system = system.withAddedObject(earth).withAddedObject(sun);
	let project = Project.getEmptyProject('Demo');
	return project.withAddedSystem(system);
}
